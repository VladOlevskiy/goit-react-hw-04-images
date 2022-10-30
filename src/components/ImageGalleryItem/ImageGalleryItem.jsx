import React, { Component } from 'react';
import {
  ImageGalleryLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem-styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  handleClick = evt => {
    const idCurrent = evt.currentTarget.getAttribute('data-key');
    this.props.onClick(idCurrent);
  };

  render() {
    return (
      <>
        {this.props.images.map(image => {
          return (
            <ImageGalleryLi
              data-key={image.id}
              key={image.id}
              onClick={this.handleClick}
            >
              <ImageGalleryItemImage src={image.webformatURL} alt="" />
            </ImageGalleryLi>
          );
        })}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.array,
};
