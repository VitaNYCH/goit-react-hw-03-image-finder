import React from 'react';
import css from './ImageGalleryItem.module.css';
export function ImageGalleryItem({ imageItem: { hits } }) {
  return (
    <ul className={css.ImageGallery}>
      {hits.map(hit => (
        <li className={css.ImageGalleryItem} key={hit.id}>
          <img
            src={hit.webformatURL}
            alt={hit.tags}
            className={css.ImageGalleryIteImage}
          />
        </li>
      ))}
    </ul>
  );
}
