import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { GetImg } from '../services/Api';
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
  const [idForModal, setIdForModal] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const images = await GetImg(searchQuery);
      setImages(images.hits);
      setLoading(false);
      setTotalPages(Math.ceil(images.totalHits / 12));
      if (images.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again'
        );
        return;
      }
    }
    if (searchQuery !== '') {
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (page !== 1) {
      if (totalPages < page) {
        setBtn(true);
        Notify.failure('This is the END');
        return;
      }
      setLoading(true);
      async function moreFetch() {
        const images = await GetImg(searchQuery, page);
        setLoading(false);
        setImages(prevState => {
          return prevState.concat(images.hits);
        });
      }
      moreFetch();
    }
  }, [page, searchQuery, totalPages]);

  const onClick = values => {
    setIsModalOpen(!isModalOpen);
    setIdForModal(values);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onSubmit = values => {
    if (values.searchQuery === '') {
      Notify.failure('Enter something');
      return;
    }
    setSearchQuery(values.searchQuery);
    setLoading(true);
    setBtn(false);
    setPage(1);
    setTotalPages(null);
  };

  return (
    <AppWrap>
      <Searchbar onSubmit={onSubmit} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery
          item={<ImageGalleryItem images={images} onClick={onClick} />}
        />
      )}
      {isModalOpen && (
        <Modal onClose={onClick}>
          {<ImgModal images={images} CurrentId={idForModal} />}
        </Modal>
      )}
      {loading && images.length > 0 && <Loader />}
      {images.length > 0 && !loading && !btn && <Button onClick={loadMore} />}
    </AppWrap>
  );
};
