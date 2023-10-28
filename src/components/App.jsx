import { fetchImages } from 'api/Images-api';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Container } from './App.styled';
import { ErrorHandler } from './ErrorHandler/ErrorHandler';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    imageName: ' ',
    status: 'idle',
    page: 1,
    modalContent: '',
  };
  componentDidUpdate = (prevProps, prevState) => {
    const { imageName, page } = this.state;
    const prevName = prevState.imageName;
    const nextName = imageName;

    if (prevName !== nextName) {
      try {
        fetchImages(nextName, page).then(images =>
          this.setState({
            images,
            page: page + 1,
            status: 'resolved',
          })
        );
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };

  getSearchName = ({ q }) => {
    if (q.trim() === ' ') {
      toast.warn('Please write key-word!');
      return;
    }
    this.setState({
      imageName: q,
      page: 1,
      status: 'pending',
    });
  };

  loadMoreImages = () => {
    const { imageName, page } = this.state;
    this.setState({
      status: 'pending',
    });
    try {
      fetchImages(imageName, page).then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
          status: 'resolved',
        }));
      });
    } catch (error) {
      this.setState({
        status: 'rejected',
      });
    }
  };
  closeModal = () => {
    this.setState({
      modalContent: '',
    });
  };
  openModal = largeImg => {
    this.setState({
      modalContent: largeImg,
    });
  };

  render() {
    const { images, imageName, modalContent, status } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.getSearchName} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery images={images} onClick={this.openModal} />
        )}
        {status === 'rejected' && <ErrorHandler />}
        {images.length > 0 && <Button onClick={this.loadMoreImages} />}
        {modalContent && (
          <Modal onClose={this.closeModal}>
            <img src={modalContent} alt={imageName} />
          </Modal>
        )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}
