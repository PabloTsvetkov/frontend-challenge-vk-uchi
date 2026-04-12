import s from "./MainPage.module.css";
import Grid from "../../components/Grid/Grid";
import type { Cat } from "../../types/Cat";
import { useEffect, useRef } from "react";

export default function MainPage({
  cats,
  changeFavorite,
  loadMoreCats,
  isLoading,
  error
}: {
  cats: Cat[];
  changeFavorite: (id: string) => void;
  loadMoreCats: () => void;
  isLoading: boolean;
  error: string;
}): React.ReactNode {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return ;

    const observer = new IntersectionObserver((entr) => {
      if (entr[0]?.isIntersecting) {
        loadMoreCats();
      }
    }, { rootMargin: "300px", threshold: 0 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMoreCats])

  return (
    <div className={s.mainPageContainer}>
      <Grid cats={cats} changeFavorite={changeFavorite} />

      <div ref={loadMoreRef}></div>

      {isLoading ? <div className={s.loadingTitle}>... загружаем еще котиков ...</div> : null}

      {error ? <div style={{ color: 'red' }}>{error}</div> : null}
    </div>
  );
}
