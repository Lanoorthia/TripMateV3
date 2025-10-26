import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const WEATHER_TTL_MS = 1000 * 60 * 180; // 3 hours

export async function GET(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json({ error: "placeId is required" }, { status: 400 });
  }

  const place = await prisma.place.findUnique({ where: { id: placeId } });

  if (!place) {
    return NextResponse.json({ error: "Place not found" }, { status: 404 });
  }

  const latestCache = await prisma.weatherCache.findFirst({
    where: { placeId },
    orderBy: { fetchedAt: "desc" },
  });

  const now = Date.now();
  const isStale = latestCache ? now - latestCache.fetchedAt.getTime() > WEATHER_TTL_MS : true;

  if (!isStale && latestCache) {
    return NextResponse.json({ payload: latestCache.payload, fetchedAt: latestCache.fetchedAt, stale: false });
  }

  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        payload: latestCache?.payload ?? null,
        fetchedAt: latestCache?.fetchedAt ?? null,
        stale: true,
        error: "WEATHER_API_KEY is missing. Configure the key to enable live refresh.",
      },
      { status: latestCache ? 200 : 503 },
    );
  }

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lng}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(endpoint, { next: { revalidate: 0 } });

    if (!response.ok) {
      throw new Error(`Weather API responded with ${response.status}`);
    }

    const payload = await response.json();

    const cache = await prisma.weatherCache.upsert({
      where: { placeId },
      create: { placeId, payload },
      update: { payload, fetchedAt: new Date(now) },
    });

    return NextResponse.json({ payload: cache.payload, fetchedAt: cache.fetchedAt, stale: false });
  } catch (error) {
    console.error("Failed to refresh weather", error);
    return NextResponse.json(
      {
        payload: latestCache?.payload ?? null,
        fetchedAt: latestCache?.fetchedAt ?? null,
        stale: true,
        error: "Unable to refresh weather data. Using cached payload if available.",
      },
      { status: latestCache ? 200 : 502 },
    );
  }
}
