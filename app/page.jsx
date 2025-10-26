import { readFileSync } from "node:fs";
import path from "node:path";

const LEGACY_INDEX_PATH = path.join(process.cwd(), "public", "index.html");

const extractBodyMarkup = () => {
  try {
    const html = readFileSync(LEGACY_INDEX_PATH, "utf8");
    const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (!match) {
      return "<p class=\"legacy-error\">TripMate feed could not load.</p>";
    }
    const body = match[1]
      .replace(/<script[^>]*src=[\"']script\.js[\"'][^>]*><\\/script>/i, "")
      .trim();
    return body;
  } catch (error) {
    console.error("Failed to read legacy index.html", error);
    return "<p class=\"legacy-error\">TripMate feed could not load.</p>";
  }
};

export const dynamic = "force-static";
export const runtime = "nodejs";

const legacyMarkup = extractBodyMarkup();

export default function Home() {
  return <div dangerouslySetInnerHTML={{ __html: legacyMarkup }} />;
}
