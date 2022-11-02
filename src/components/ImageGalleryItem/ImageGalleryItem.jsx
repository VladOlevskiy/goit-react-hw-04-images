import React from 'react';
import {
  ImageGalleryLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem-styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onClick }) => {
  return (
    <>
      {images.map(image => {
        const modalData = { alt: image.tags, url: image.largeImageURL };
        return (
          <ImageGalleryLi key={image.id} onClick={() => onClick(modalData)}>
            <ImageGalleryItemImage src={image.webformatURL} alt="" />
          </ImageGalleryLi>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.array,
};
