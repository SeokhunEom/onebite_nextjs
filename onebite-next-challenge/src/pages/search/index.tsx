import { ReactNode, useEffect, useState } from "react";

import Link from "next/link";
import { MovieData } from "@/types";
import MovieItem from "@/components/MovieItem";
import SearchableLayout from "@/components/SearchableLayout";
import fetchMovies from "@/lib/fetchMovies";
import style from "./index.module.css";
import { useRouter } from "next/router";

function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const { q } = router.query;

  const fetchSearchResults = async () => {
    const data = await fetchMovies(q as string);
    const searchedMovies = data.filter((movie) =>
      movie.title.includes(q as string)
    );

    setMovies(searchedMovies);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResults();
    }
  }, [q]);

  return (
    <ul className={style.grid3}>
      {movies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <MovieItem movie={movie} />
        </Link>
      ))}
    </ul>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Page;
