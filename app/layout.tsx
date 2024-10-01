import type { Metadata } from "next";
import { DM_Mono, Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { Providers } from "./providers";
import { Header } from "./components/header";
import localFont from "next/font/local";
import { Footer } from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

const founders = localFont({
  src: [
    {
      path: "fonts/FoundersGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-founders",
});

const mono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Allo Leaderboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${founders.variable} ${mono.variable} font-sans`}
    >
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
