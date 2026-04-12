import Grid from "../../components/Grid/Grid";
import type { Cat } from "../../types/Cat";
import s from "./FavoritePage.module.css";

export default function FavoritePage({
  favoriteCats,
  changeFavorite,
}: {
  favoriteCats: Cat[];
  changeFavorite: (id: string) => void;
}): React.ReactNode {
  return (
    <div className={s.favoritePageContainer}>
      {favoriteCats.length === 0 ? (
        <div className={s.emptyState}>Любимых котиков пока нет :(</div>
      ) : (
        <Grid
          cats={favoriteCats.map((cat) => ({ ...cat, favorite: true }))}
          changeFavorite={changeFavorite}
        />
      )}
    </div>
  );
}
