import React from 'react';
import PropTypes from 'prop-types';

export const ImgModal = ({ images, CurrentId }) => {
  const idCurrentImageForModal = Number(CurrentId);
  let largeImageURL;
  let imgTeg;
  images.forEach(image => {
    if (image.id === idCurrentImageForModal) {
      return (
        (largeImageURL = `${image.largeImageURL}`), (imgTeg = `${image.tags}`)
      );
    }
  });
  return <img src={largeImageURL} width="800px" alt={imgTeg}></img>;
};

ImgModal.propTypes = {
  CurrentId: PropTypes.string,
  images: PropTypes.array,
  largeImageURL: PropTypes.string,
};
