import { BookData } from "@/types";

async function fetchOneBook(id: string): Promise<BookData | null> {
  const url = `http://localhost:12345/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("");
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default fetchOneBook;
