import "./globals.css";

export const metadata = {
  title: "TripMate",
  description: "TripMate social travel showcase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
