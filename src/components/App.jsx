import { fetchImages } from 'api/Images-api';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useFirstMountState } from 'react-use';
import { Container } from './App.styled';
import { ErrorHandler } from './ErrorHandler/ErrorHandler';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [modalContent, setModalContent] = useState('');

  const isFirstRender = useFirstMountState();
  const btnMoreCondition = status !== 'pending' && images.length > 0;

  useEffect(() => {
    if (!isFirstRender) {
      setStatus(Status.PENDING);
      console.log(imageName);
      try {
        fetchImages(imageName, page).then(images => {
          setImages(prevState => [...prevState, ...images]);
          if (images.length === 0) {
            setStatus(Status.REJECTED);
            return;
          }
          setStatus(Status.RESOLVED);
        });
      } catch (error) {
        setStatus(Status.REJECTED);
      }
    }
  }, [imageName, isFirstRender, page]);

  const getSearchName = q => {
    if (q.trim() === ' ') {
      toast.warn('Please write key-word!');
      return;
    }
    setImages([]);
    setImageName(q);

    setPage(1);
  };
  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };
  const closeModal = () => {
    setModalContent('');
  };
  const openModal = largeImg => {
    setModalContent(largeImg);
  };

  return (
    <Container>
      <SearchBar onSubmit={getSearchName} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery images={images} onClick={openModal} />
      )}
      {status === 'rejected' && <ErrorHandler />}
      {btnMoreCondition && <Button onClick={loadMoreImages} />}
      {modalContent && (
        <Modal onClose={closeModal}>
          <img src={modalContent} alt={imageName} />
        </Modal>
      )}
      <ToastContainer autoClose={2000} />
    </Container>
  );
};
