import { MovieData } from "@/types";
import MovieList from "@/components/MovieList";
import MovieListSkeleton from "@/components/MovieListSkeleton";
import { Suspense } from "react";
import { delay } from "@/utils/delay";
import style from "./page.module.css";

export const dynamic = "force-dynamic";

async function AllMovies() {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    {
      cache: "force-cache",
    }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const allMovies: MovieData[] = await response.json();

  return <MovieList movies={allMovies} rowItems={5} keyName="allMovies" />;
}

async function RecommendedMovies() {
  await delay(3000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const recommendedMovies: MovieData[] = await response.json();

  return (
    <MovieList
      movies={recommendedMovies}
      rowItems={3}
      keyName="recommendedMovies"
    />
  );
}

async function Home() {
  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<MovieListSkeleton rowItems={3} />}>
          <RecommendedMovies />
        </Suspense>
      </section>
      <section className={style.section}>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<MovieListSkeleton rowItems={5} />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}

export default Home;
