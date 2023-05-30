import React from 'react';
import css from './ImageGallery.module.css';
export function Gallery({ imageItem: { hits } }) {
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
