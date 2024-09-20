import { ReactNode, useEffect, useState } from "react";

import Head from "next/head";
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
    <>
      <Head>
        <title>한입 씨네마 | 검색: {q}</title>
        <meta property="og:title" content="한입 씨네마" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta
          property="og:description"
          content="한입 씨네마에서 영화를 검색하고 추천받아보세요."
        />
      </Head>
      <ul className={style.grid3}>
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <MovieItem movie={movie} />
          </Link>
        ))}
      </ul>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

export default Page;
