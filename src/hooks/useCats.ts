import { useCallback, useEffect, useMemo, useState } from "react";
import { getCats } from "../api/CatApi";
import type { Cat } from "../types/Cat";

const FAVORITE_CATS_KEY = "favoriteCats";

function loadFavoritesFromStorage(): Cat[] {
  try {
    const data = localStorage.getItem(FAVORITE_CATS_KEY);
    if (!data) return [];
    const res = JSON.parse(data);
    if (!Array.isArray(res)) return [];
    return res;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function saveFavoritesToStorage(cats: Cat[]): void {
  try {
    localStorage.setItem(FAVORITE_CATS_KEY, JSON.stringify(cats));
  } catch (e) {
    console.log(e);
  }
}

interface HookInterface {
  cats: Cat[];
  favoriteCats: Cat[];
  isLoading: boolean;
  error: string;
  loadMoreCats: () => void;
  changeFavorite: (id: string) => void;
}

export function useCats(): HookInterface {
  const [cats, setCats] = useState<Cat[]>([]);
  const [favoriteCats, setFavoriteCats] = useState<Cat[]>(loadFavoritesFromStorage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const favoriteIds = useMemo(
    () => new Set(favoriteCats.map((cat) => cat.id)),
    [favoriteCats],
  );

  const catsForMain = useMemo(
    () =>
      cats.map((cat) => ({
        ...cat,
        favorite: favoriteIds.has(cat.id),
      })),
    [cats, favoriteIds],
  );

  useEffect(() => {
    saveFavoritesToStorage(favoriteCats);
  }, [favoriteCats]);

  const loadMoreCats = useCallback(async () => {
    if (isLoading) return;
    setError("");
    setIsLoading(true);

    try {
      const newData = await getCats(page);
      setCats((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.log(e);
      setError("Не удалось загрузить больше котов");
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading]);

  const changeFavorite = useCallback(
    (id: string) => {
      setFavoriteCats((prev) => {
        if (prev.some((cat) => cat.id === id)) {
          return prev.filter((cat) => cat.id !== id);
        }
        const cat = cats.find((c) => c.id === id);
        if (!cat) return prev;
        return [...prev, { ...cat, favorite: true }];
      });
    },
    [cats],
  );

  useEffect(() => {
    loadMoreCats();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cats: catsForMain,
    favoriteCats,
    isLoading,
    error,
    loadMoreCats,
    changeFavorite,
  };
}
