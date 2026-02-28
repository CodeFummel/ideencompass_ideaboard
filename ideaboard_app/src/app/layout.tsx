import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Roboto_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const robotoSans = Roboto({
    variable: "--font-roboto-sans",
    subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ideenboard",
    description: "Ein Board zum organiesieren und verwalten von Ideen",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
(function() {
  try {
    const saved = localStorage.getItem("darkMode");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved !== null ? saved === "true" : systemDark;

    if (dark) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
            `,
                }}
            />
        </head>

        <body
            className={`${geistSans.variable} ${geistMono.variable} ${robotoSans.variable} ${robotoMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}