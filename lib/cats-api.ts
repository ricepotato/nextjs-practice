import { withLogging } from "@/lib/logging";

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: any;
}

async function fetchCats({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<CatImage[]> {
  const headers = {
    "x-api-key": process.env.CAT_API_KEY as string,
  };
  const resp = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}`,
    { headers }
  );
  return await resp.json();
}
export const getCats = withLogging(fetchCats);
