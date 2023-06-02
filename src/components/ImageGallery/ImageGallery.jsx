import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

import css from './ImageGallery.module.css';

export const ImageGallery = ({ hits }) => {
  return (
    <ul className={css.ImageGallery}>
      {hits.map(({ largeImageURL, tags, webformatURL, id }) => (
        <li className={css.ImageGalleryItem} key={id}>
          <ImageGalleryItem
            largeImageURL={largeImageURL}
            tags={tags}
            webformatURL={webformatURL}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
