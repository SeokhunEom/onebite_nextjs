import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import Link from "next/link";
import { MovieData } from "@/types";
import MovieItem from "@/components/MovieItem";
import { ReactNode } from "react";
import SearchableLayout from "@/components/SearchableLayout";
import fetchMovies from "@/lib/fetchMovies";
import style from "./index.module.css";
import { useRouter } from "next/router";

function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { q } = router.query;
  const searchedMovies = movies.filter((movie: MovieData) =>
    movie.title.includes(q as string)
  );

  return (
    <ul className={style.grid3}>
      {searchedMovies.map((movie) => (
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q as string;
  const movies = await fetchMovies(q);

  return {
    props: {
      movies,
    },
  };
};

export default Page;
