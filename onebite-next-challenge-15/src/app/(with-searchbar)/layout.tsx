import SearchBar from "@/components/SearchBar";

interface LayoutProps {
  readonly children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
}

export default Layout;
