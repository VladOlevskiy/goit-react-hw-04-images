import React from 'react';
import PropTypes from 'prop-types';

export const ImgModal = ({ data }) => {
  return <img src={data.url} width="800px" alt={data.alt}></img>;
};

ImgModal.propTypes = {
  CurrentId: PropTypes.string,
  images: PropTypes.array,
  largeImageURL: PropTypes.string,
};
