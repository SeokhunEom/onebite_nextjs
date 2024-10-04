import { Metadata } from "next";
import { MovieData } from "@/types";
import MovieList from "@/components/MovieList";
import MovieListSkeleton from "@/components/MovieListSkeleton";
import { Suspense } from "react";

interface PageProps {
  searchParams: {
    q?: string;
  };
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  return {
    title: `${searchParams.q} - 한입 씨네마 검색`,
    description: `${searchParams.q} 검색 결과입니다`,
    openGraph: {
      title: `${searchParams.q} : 한입 씨네마 검색`,
      description: `${searchParams.q} 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

async function SearchResult({ searchParams }: PageProps) {
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
  if (movies.length === 0) {
    return <div>검색 결과가 없습니다...</div>;
  }

  return <MovieList movies={movies} rowItems={3} keyName="SearchMovie" />;
}

async function Page({ searchParams }: PageProps) {
  return (
    <Suspense
      key={searchParams.q || ""}
      fallback={<MovieListSkeleton rowItems={3} />}
    >
      <SearchResult searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
