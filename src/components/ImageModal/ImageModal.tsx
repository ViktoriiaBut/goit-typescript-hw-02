import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { FC } from "react";

interface ImageModalProps {
  isOpen: boolean;
  image: string | null;
  onClose: () => void;
}


Modal.setAppElement("#root");
// Modal.setAppElement(document.getElementById("root"));

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, image, onClose}) => {
  return (
    <Modal className={s.modal} isOpen={isOpen} onRequestClose={onClose} overlayClassName={s.overlay}>
        { image && < img src={image} alt="Selected" className={s.modalImage}/> }
    </Modal>
  );
};

export default ImageModal;