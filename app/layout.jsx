import "./globals.css";

export const metadata = {
  title: "TripMate — Social Travel Feed",
  description: "TripMate social travel lifestyle feed for discovering Pathum Thani adventures.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Prompt:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body data-page="home">
        {children}
        <script src="/script.js" defer></script>
      </body>
    </html>
  );
}
