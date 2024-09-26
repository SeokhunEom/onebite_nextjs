import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

interface LayoutProps {
  readonly children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Suspense fallback={<></>}>
        <SearchBar />
      </Suspense>
      {children}
    </div>
  );
}

export default Layout;
