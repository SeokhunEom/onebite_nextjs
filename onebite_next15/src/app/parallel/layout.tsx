interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  feed: React.ReactNode;
}

function Layout({ children, sidebar, feed }: LayoutProps) {
  return (
    <div>
      {sidebar}
      {feed}
      {children}
    </div>
  );
}

export default Layout;
