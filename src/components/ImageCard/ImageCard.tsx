import s from "./ImageCard.module.css";
import { FC } from 'react';

interface ImageCardProps {
  name: string;
  likes: number;
  cardPhoto: string;
  onClick: () => void;
}


const ImageCard: FC<ImageCardProps>= ({ name, likes, cardPhoto, onClick }) => {
 return (
<div className={s.imageCardWrapper} onClick={onClick}>
  <img src={cardPhoto} className={s.imageCard} alt={name} />
  <div className={s.imageInfo}>
    <p>{name}</p>
    <p>❤️ {likes}</p>
  </div>
  </div>
 );
};

export default ImageCard;

