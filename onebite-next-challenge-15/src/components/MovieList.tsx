import Link from "next/link";
import { MovieData } from "@/types";
import MovieItem from "@/components/MovieItem";
import style from "./MovieList.module.css";

interface MovieListProps {
  movies: MovieData[];
  rowItems: 3 | 5;
  keyName: string;
}

async function MovieList({ keyName, movies, rowItems }: MovieListProps) {
  return (
    <ul className={rowItems === 3 ? `${style.grid3}` : `${style.grid5}`}>
      {movies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={`${keyName}${movie.id}`}>
          <MovieItem key={movie.id} movie={movie} />
        </Link>
      ))}
    </ul>
  );
}

export default MovieList;
