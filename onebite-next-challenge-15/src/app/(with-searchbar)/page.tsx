import Link from "next/link";
import MovieItem from "@/components/MovieItem";
import data from "@/mock/dummy.json";
import style from "./page.module.css";

function Home() {
  const allMovies = data;
  const recommendedMovies = allMovies.slice(0, 3);

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>지금 가장 추천하는 영화</h3>
        <ul className={style.grid3}>
          {recommendedMovies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <MovieItem movie={movie} />
            </Link>
          ))}
        </ul>
      </section>
      <section className={style.section}>
        <h3>등록된 모든 영화</h3>
        <ul className={style.grid5}>
          {allMovies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <MovieItem key={movie.id} movie={movie} />
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
