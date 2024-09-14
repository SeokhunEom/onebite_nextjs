import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import fetchMovieDetail from "@/lib/fetchMovieDetail";
import style from "./[id].module.css";

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
