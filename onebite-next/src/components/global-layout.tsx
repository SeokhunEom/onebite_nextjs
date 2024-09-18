import Link from "next/link";
import style from "./global-layout.module.css";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @seokhun</footer>
    </div>
  );
}

export default GlobalLayout;
