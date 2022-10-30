import React from 'react';
import { ImageGalleryList } from './ImageGallery-styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ item }) => {
  return <ImageGalleryList>{item}</ImageGalleryList>;
};

ImageGallery.propTypes = {
  item: PropTypes.element.isRequired,
};
