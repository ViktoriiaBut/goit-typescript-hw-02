import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import { Image, Response } from "./App.types";

const KEY = "qPFeK_Yb8bseog7rmNx9ZiEqmz3TMS6gci6wwcZRweY";

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchImages = async (searchQuery: string,
      newPage: number = 1,
      isLoadMore: boolean = false)
      : Promise<void> => {
    try {
      isLoadMore ? setIsLoadingMore(true) : setIsLoading(true);
      setHasError(false);

      const response = await axios.get<Response>("https://api.unsplash.com/search/photos", {
        params: {
          query: searchQuery,
          page: newPage,
          per_page: 16,
          client_id: KEY,
        },
      });


      if (response.data.results.length === 0) {
        toast.error("Nothing found!");
        return;
      }

      setImages(prevImages =>
        newPage === 1 ? response.data.results : [...prevImages, ...response.data.results]
      );
      setPage(newPage);
      setQuery(searchQuery);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setHasError(true);
      toast.error("Failed to get images!");
      console.error("Ошибка при загрузке изображений:", err);
    } finally {
      isLoadMore ? setIsLoadingMore(false) : setIsLoading(false);
    }
  };

  const addLoadMore = () => {
    fetchImages(query, page + 1, true);
  };

  
  const handleSearch = (newQuery: string) => {
    setImages([]);
    setPage(1);
    fetchImages(newQuery, 1);
  };

  function openModal() {
    setIsModalOpen(true)
    
  };

  function closeModal() {
    setIsModalOpen(false)
    
  };

  function handleClick (image: string) {
    setSelectedImage(image);
    setIsModalOpen(true);
    openModal();
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} disabled={isLoading} />

      {isLoading && <Loader load={true} />}
      {hasError && < ErrorMessage />}

      <ImageGallery images={images} onImageClick={handleClick} />

      {page < totalPages && images.length > 0 && (
        <LoadMoreBtn onClick={addLoadMore} loadMore={isLoadingMore} />
      )}

      <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={closeModal} />
    </>
  );
};

export default App;

