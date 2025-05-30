import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { Image } from "../../App.types"


interface ImageProps {
  images: Image[];
  onImageClick: (images: string) => void; 
}

const ImageGallery = ({ images, onImageClick }: ImageProps) => {
    if (!Array.isArray(images)) {
           return null; 
    }
  
    return (
      <div>
        <ul className={s.gallery}>
          {images.map((image) => {
            const { id, likes, user, urls } = image;
            const name = user?.name;
            const small = urls?.small;
            const regular = urls?.regular;
  
            return (
              <li className={s.galleryItem} key={id}>
                <ImageCard
                  name={name}
                  likes={likes}
                  cardPhoto={small}
                  onClick={() => onImageClick(regular)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
export default ImageGallery;

