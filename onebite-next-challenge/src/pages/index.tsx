import { ReactNode } from "react";
import SearchableLayout from "@/components/SearchableLayout";

function Home() {
  return <h1>Home</h1>;
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Home;
