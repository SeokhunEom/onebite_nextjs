import BookItemSkeleton from "./book-item-skeleton";

interface BookListSkeletonProps {
  count: number;
}

function BookListSkeleton({ count }: BookListSkeletonProps) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`} />);
}

export default BookListSkeleton;
