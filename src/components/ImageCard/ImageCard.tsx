import type React from 'react';
import s from './ImageCard.module.css';
import LikeIcon from './LikeIcon/LikeIcon';
import type { Cat } from '../../types/Cat';

export default function ImageCard({ cat, changeFavorite } : { cat: Cat, changeFavorite: (id: string) => void }):React.ReactNode {
    return (
        <div className={`${s.imageCardContainer} ${cat.favorite ? s.liked : ''}`}>
            <img alt='cat' src={cat.url} />

            <div className={`${s.likeContainer}`} onClick={() => changeFavorite(cat.id)}>
                <LikeIcon/>
            </div>
        </div>
    );
}