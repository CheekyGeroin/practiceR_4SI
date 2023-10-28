import { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { smallImage, largeImage, tags, onClick } = this.props;
    return (
      <ImageItem
        onClick={() => {
          onClick(largeImage);
        }}
      >
        <Image src={smallImage} alt={tags} />
      </ImageItem>
    );
  }
}
ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
