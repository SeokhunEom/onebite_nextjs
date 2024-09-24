import data from "@/mock/dummy.json";
import { notFound } from "next/navigation";
import style from "./page.module.css";

interface PageProps {
  params: {
    id: string;
  };
}

function Page({ params }: PageProps) {
  const movie = data.find((movie) => movie.id === Number(params.id));

  if (!movie) {
    notFound();
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

export default Page;
