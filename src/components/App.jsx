import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isModalOpen: false,
    idForModal: null,
    page: 1,
    loading: false,
    totalPages: null,
    btn: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const images = await GetImg(this.state.searchQuery);
      this.setState({
        images: images.hits,
        loading: false,
        totalPages: Math.ceil(images.totalHits / 12),
      });
      if (images.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again'
        );
        return;
      }
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      if (this.state.totalPages < this.state.page) {
        this.setState({ btn: true });
        Notify.failure('This is the END');
        return;
      }
      this.setState({ loading: true });
      const images = await GetImg(this.state.searchQuery, this.state.page);
      this.setState(prevState => ({
        images: prevState.images.concat(images.hits),
        loading: false,
      }));
    }
  }

  onClick = values => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      idForModal: values,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSubmit = values => {
    if (values.searchQuery === '') {
      Notify.failure('Enter something');
      return;
    }
    this.setState({
      searchQuery: values.searchQuery,
      loading: true,
      btn: false,
      page: 1,
      totalPages: null,
    });
  };

  render() {
    return (
      <AppWrap>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.loading && <Loader />}
        {this.state.images.length > 0 && (
          <ImageGallery
            item={
              <ImageGalleryItem
                images={this.state.images}
                onClick={this.onClick}
              />
            }
          />
        )}
        {this.state.isModalOpen && (
          <Modal onClose={this.onClick}>
            {<ImgModal images={this.state} />}
          </Modal>
        )}
        {this.state.loading && this.state.images.length > 0 && <Loader />}
        {this.state.images.length > 0 &&
          !this.state.loading &&
          !this.state.btn && <Button onClick={this.loadMore} />}
      </AppWrap>
    );
  }
}
