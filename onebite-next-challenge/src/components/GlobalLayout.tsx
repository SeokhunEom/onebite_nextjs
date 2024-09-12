import Link from "next/link";
import { ReactNode } from "react";
import style from "./GlobalLayout.module.css";

interface GlobalLayoutProps {
  children: ReactNode;
}

function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">ONEBITE CINEMA</Link>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default GlobalLayout;
