import ImageCard from '../ImageCard/ImageCard';
import s from './Grid.module.css';
import type { Cat } from '../../types/Cat';

export default function Grid({ cats, changeFavorite } : { cats: Cat[], changeFavorite: (id: string) => void }):React.ReactNode {
    return (
        <div className={s.gridContainer}>
            {cats?.map((cat) => (
                <ImageCard key={cat.id} cat={cat} changeFavorite={changeFavorite} />
            ))}
        </div>
    );
}