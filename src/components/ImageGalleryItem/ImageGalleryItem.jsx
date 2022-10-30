import React from 'react';
import {
  ImageGalleryLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem-styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onClick }) => {
  const handleClick = evt => {
    const idCurrent = evt.currentTarget.getAttribute('data-key');
    onClick(idCurrent);
  };

  return (
    <>
      {images.map(image => {
        return (
          <ImageGalleryLi
            data-key={image.id}
            key={image.id}
            onClick={handleClick}
          >
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
