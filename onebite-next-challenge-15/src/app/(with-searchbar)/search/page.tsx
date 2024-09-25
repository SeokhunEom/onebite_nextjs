import { MovieData } from "@/types";
import MovieList from "@/components/MovieList";

interface PageProps {
  searchParams: {
    q?: string;
  };
}

async function Page({ searchParams }: PageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${searchParams.q}`,
    {
      cache: "force-cache",
    }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const movies: MovieData[] = await response.json();

  return <MovieList movies={movies} rowItems={3} keyName="SearchMovie" />;
}

export default Page;
