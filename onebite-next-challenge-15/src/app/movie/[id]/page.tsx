import { Metadata } from "next";
import { MovieData } from "@/types";
import MovieDetail from "@/components/MovieDetail";
import ReviewEditor from "@/components/ReviewEditor";
import ReviewList from "@/components/ReviewList";
import { notFound } from "next/navigation";
import style from "./page.module.css";

interface PageProps {
  params: {
    id: string | string[];
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const movie: MovieData = await response.json();

  return {
    title: `${movie.title} - 한입 씨네마`,
    description: movie.description,
    openGraph: {
      title: `${movie.title} - 한입 씨네마`,
      description: movie.description,
      images: [movie.posterImgUrl],
    },
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

  return (
    <div className={style.container}>
      <MovieDetail movie={movie} />
      <ReviewEditor movieId={movie.id} />
      <ReviewList movieId={movie.id} />
    </div>
  );
}

export default Page;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
  );
  const movies: MovieData[] = await response.json();

  return movies.map((movie) => ({
    id: String(movie.id),
  }));
}

export const dynamicParams = false;
