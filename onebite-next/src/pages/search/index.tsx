import { ReactNode, useEffect, useState } from "react";

import { BookData } from "@/types";
import BookItem from "@/components/book-item";
import Head from "next/head";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResults = async () => {
    const books = await fetchBooks(q as string);
    setBooks(books);
  };

  useEffect(() => {
    if (!q) {
      return;
    }
    fetchSearchResults();
  }, [q]);

  return (
    <>
      <Head>
        <title>한입북스 - 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
