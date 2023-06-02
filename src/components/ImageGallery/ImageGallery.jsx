import React from 'react';
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
