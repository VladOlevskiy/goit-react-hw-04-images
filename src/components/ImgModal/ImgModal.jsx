import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImgModal extends Component {
  render() {
    const idCurrentImageForModal = Number(this.props.images.idForModal);
    const arrayImg = this.props.images.images;
    let largeImageURL;
    let imgTeg;

    arrayImg.forEach(image => {
      if (image.id === idCurrentImageForModal) {
        return (
          (largeImageURL = `${image.largeImageURL}`), (imgTeg = `${image.tags}`)
        );
      }
    });

    return <img src={largeImageURL} width="800px" alt={imgTeg}></img>;
  }
}

ImgModal.propTypes = {
  idForModal: PropTypes.number,
  images: PropTypes.object,
  largeImageURL: PropTypes.string,
};
