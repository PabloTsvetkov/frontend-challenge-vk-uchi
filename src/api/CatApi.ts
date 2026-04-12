import type { Cat } from "../types/Cat";

export async function getCats(
  page: number,
  limit: number = 20,
): Promise<Cat[]> {
  const API_KEY = import.meta.env.VITE_CAT_API_KEY;

  console.log(API_KEY);

  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${String(limit)}&page=${String(page)}`,
    {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
      },
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text.slice(0, 200));
  }

  const responseJSON = await response.json();

  if (!Array.isArray(responseJSON)) {
    throw new Error("Ожидался массив от API");
  }

  const data = responseJSON.map(cat => ({
    id: cat.id,
    url: cat.url,
    width: cat.width,
    height: cat.height,
    favorite: false,
  }));

  return data;
}
