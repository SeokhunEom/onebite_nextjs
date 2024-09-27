import style from "./MovieListSkeleton.module.css";

interface MovieListSkeletonProps {
  rowItems: number;
}

async function MovieListSkeleton({ rowItems }: MovieListSkeletonProps) {
  return (
    <ul className={rowItems === 3 ? `${style.grid3}` : `${style.grid5}`}>
      {Array(rowItems)
        .fill(0)
        .map((_, index) => (
          <li key={index}>
            <div
              className={rowItems === 3 ? `${style.box3}` : `${style.box5}`}
            />
          </li>
        ))}
    </ul>
  );
}

export default MovieListSkeleton;
