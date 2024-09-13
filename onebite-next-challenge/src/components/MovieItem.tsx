import type { MovieData } from "@/types";
import style from "./MovieItem.module.css";

function MovieItem({ movie }: { movie: MovieData }) {
  return (
    <li className={style.container}>
      <img src={movie.posterImgUrl} />
    </li>
  );
}

export default MovieItem;
