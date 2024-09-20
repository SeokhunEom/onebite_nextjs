import { MovieData } from "@/types";

async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = `https://onebite-cinema-api-main-nine.vercel.app/movie/random`;

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

export default fetchRandomMovies;
