import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "RecordNinja - Online free screen recorder",
  description:"Capture high-quality videos effortlessly with no watermark, for free. Record your screen, webcam, and voice, and save them instantly to your computer.",
  keywords:"Online screen recorder,screen recorder,record screen , audio recording software, recording software, free recorder online, RecordNinja",
  authors: [{ name: "Aniket Gupta" }],
  robots: "index, follow",
  openGraph: {
    title: "RecordNinja - Online free screen recorder",
    description:
"Capture high-quality videos effortlessly with no watermark, for free. Record your screen, webcam, and voice, and save them instantly to your computer.",
    url: "https://recordninja.vercel.app",
    type: "website",
    images: [
      {
        url: "https://recordninja.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RecordNinja - Online free screen recorder",
      },
    ],
  },
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
      <meta name="google-site-verification" content="BsCmAXmYLwMkOiWRRrSMXCa7V0RS9ZuYmR8ZDZzb5MM" />
      </Head>
      <body className="dark:bg-stone-900">
        {children}
        <div id="modal-root "></div>
      </body>
    </html>
  );
}
