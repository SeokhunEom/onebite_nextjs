import Link from "next/link";
import MovieItem from "@/components/MovieItem";
import data from "@/mock/dummy.json";
import style from "./page.module.css";

interface PageProps {
  searchParams: {
    q?: string;
  };
}

function Page({ searchParams }: PageProps) {
  const movies = data.filter((movie) =>
    movie.title.includes(searchParams.q as string)
  );

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

export default Page;
