import { MovieData } from "@/types";
import MovieDetail from "@/components/MovieDetail";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string | string[];
  };
}

async function Page({ params }: PageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다 ...</div>;
  }
  const movie: MovieData = await response.json();

  return <MovieDetail movie={movie} />;
}

export default Page;
