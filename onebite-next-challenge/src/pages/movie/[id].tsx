import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import fetchMovieDetail from "@/lib/fetchMovieDetail";
import fetchMovies from "@/lib/fetchMovies";
import style from "./[id].module.css";
import { useRouter } from "next/router";

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <div
        className={style.posterImg}
        style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
      >
        <img src={movie.posterImgUrl} alt={movie.title} />
      </div>
      <div className={style.title}>{movie.title}</div>
      <div className={style.info}>
        {movie.releaseDate} / {movie.genres} / {movie.runtime}분
      </div>
      <div className={style.company}>{movie.company}</div>
      <div className={style.subTitle}>{movie.subTitle}</div>
      <div className={style.description}>{movie.description}</div>
    </div>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;
  const movie = await fetchMovieDetail(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  const paths = movies.map((movie) => ({
    params: { id: String(movie.id) },
  }));

  return {
    paths,
    fallback: true,
  };
};
