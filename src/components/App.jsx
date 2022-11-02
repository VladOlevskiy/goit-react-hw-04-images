import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImg } from '../services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { AppWrap } from './App-styled';
import { Modal } from './Modal/Modal';
import { ImgModal } from './ImgModal/ImgModal';
import { Button } from './Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function firstFetchData(searchQuery, page) {
      try {
        setLoading(true);
        const images = await getImg(searchQuery, page);
        const totalPages = Math.ceil(images.totalHits / 12);
        if (images.hits.length === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again'
          );
          return;
        }
        if (page >= totalPages) {
          setBtn(true);
          setLoading(false);
          Notify.failure('This is the END');
        }
        const filterDateOfImages = images.hits.map(image => {
          return {
            id: image.id,
            tags: image.tags,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
          };
        });
        setImages(prevState => [...prevState, ...filterDateOfImages]);
      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }
    firstFetchData(searchQuery, page);
  }, [page, searchQuery]);

  const toggleModal = modalData => {
    setIsModalOpen(prev => !prev);
    setModalData(modalData ? modalData : null);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onSubmit = values => {
    if (values.searchQuery === '') {
      Notify.failure('Enter something');
      return;
    }
    setSearchQuery(prev => values.searchQuery);
    setImages([]);
    setBtn(false);
    setPage(1);
  };

  return (
    <AppWrap>
      <Searchbar onSubmit={onSubmit} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery
          item={<ImageGalleryItem images={images} onClick={toggleModal} />}
        />
      )}
      {isModalOpen && (
        <Modal onClose={toggleModal}>{<ImgModal data={modalData} />}</Modal>
      )}
      {loading && images.length > 0 && <Loader />}
      {images.length > 0 && !loading && !btn && <Button onClick={loadMore} />}
    </AppWrap>
  );
};
