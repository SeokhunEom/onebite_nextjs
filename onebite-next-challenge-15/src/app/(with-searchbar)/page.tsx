import { MovieData } from "@/types";
import MovieList from "@/components/MovieList";
import style from "./page.module.css";

async function Home() {
  const [allMoviesResponse, recommendedMoviesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {
      cache: "force-cache",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`, {
      next: {
        revalidate: 60,
      },
    }),
  ]);
  if (!allMoviesResponse.ok || !recommendedMoviesResponse.ok) {
    <div>오류가 발생했습니다 ...</div>;
  }
  const [allMovies, recommendedMovies]: [MovieData[], MovieData[]] =
    await Promise.all([
      allMoviesResponse.json(),
      recommendedMoviesResponse.json(),
    ]);

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>지금 가장 추천하는 영화</h3>
        <MovieList
          movies={recommendedMovies}
          rowItems={3}
          keyName="recommendedMovies"
        />
      </section>
      <section className={style.section}>
        <h3>등록된 모든 영화</h3>
        <MovieList movies={allMovies} rowItems={5} keyName="allMovies" />
      </section>
    </div>
  );
}

export default Home;
