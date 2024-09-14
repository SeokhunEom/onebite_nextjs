import Link from "next/link";
import type { MovieData } from "@/types";
import MovieItem from "@/components/MovieItem";
import { ReactNode } from "react";
import SearchableLayout from "@/components/SearchableLayout";
import fetchMovies from "@/lib/fetchMovies";
import fetchRandomMovies from "@/lib/fetchRandomMovies";
import style from "./index.module.css";

interface HomeProps {
  allMovies: MovieData[];
  recommendedMovies: MovieData[];
}

function Home({ allMovies, recommendedMovies }: HomeProps) {
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

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export const getStaticProps = async () => {
  const [allMovies, recommendedMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recommendedMovies,
    },
  };
};

export default Home;
