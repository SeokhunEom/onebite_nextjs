import { MovieData } from "@/types";

async function fetchMovies(q?: string): Promise<MovieData[]> {
  const url = `http://localhost:12345/movie${q ? `?search=${q}` : ""}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchMovies;
