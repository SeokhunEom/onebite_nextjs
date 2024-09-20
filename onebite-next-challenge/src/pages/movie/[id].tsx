import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import Head from "next/head";
import fetchMovieDetail from "@/lib/fetchMovieDetail";
import fetchMovies from "@/lib/fetchMovies";
import style from "./[id].module.css";
import { useRouter } from "next/router";

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입 씨네마</title>
          <meta property="og:title" content="한입 씨네마" />
          <meta property="og:image" content="/thumbnail.png" />
          <meta
            property="og:description"
            content="한입 씨네마에서 영화를 검색하고 추천받아보세요."
          />
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>한입 씨네마 | {movie.title}</title>
        <meta property="og:title" content={`한입 씨네마 | ${movie.title}`} />
        <meta property="og:image" content={movie.posterImgUrl} />
        <meta
          property="og:description"
          content={`${movie.title} - ${movie.description}`}
        />
      </Head>
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
    </>
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
