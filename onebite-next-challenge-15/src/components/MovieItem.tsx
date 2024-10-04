import Image from "next/image";
import type { MovieData } from "@/types";
import style from "./MovieItem.module.css";

interface MovieItemProps {
  movie: MovieData;
  imgSize: "lg" | "md";
}

function MovieItem({ movie, imgSize }: MovieItemProps) {
  return (
    <li className={style.container}>
      <Image
        src={movie.posterImgUrl}
        alt={movie.title}
        width={imgSize === "lg" ? 260 : 152}
        height={imgSize === "lg" ? 390 : 228}
      />
    </li>
  );
}

export default MovieItem;
