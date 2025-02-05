"use client";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AI Monstropedia</title>
        <meta name="description" content="Discover AI-generated monsters in Monstropedia!" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background-primary text-foreground">{children}</body>
    </html>
  );
}
