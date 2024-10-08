import type { Metadata } from "next";
import { MovieData } from "@/types";
import MovieList from "@/components/MovieList";
import style from "./page.module.css";

export const metadata: Metadata = {
  title: "한입 씨네마",
  description: "한입 씨네마에서 영화를 검색하고 추천받아보세요.",
  openGraph: {
    title: "한입 씨네마",
    description: "한입 씨네마에서 영화를 검색하고 추천받아보세요.",
    images: ["/thumbnail.png"],
  },
};

async function AllMovies() {
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
        <RecommendedMovies />
      </section>
      <section className={style.section}>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}

export default Home;
