import "./globals.css";

import Link from "next/link";
import type { Metadata } from "next";
import style from "./layout.module.css";

export const metadata: Metadata = {
  title: "한입 씨네마",
  description: "한입 씨네마에서 영화를 검색하고 추천받아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href="/">ONEBITE CINEMA</Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
