import React from 'react';
import css from './Button.module.css';
export function Button({ handleLoadMore, status, pendingStatus }) {
  return (
    <button type="button" className={css.Button} onClick={handleLoadMore}>
      {status === pendingStatus ? 'Loading...' : 'Load More'}
    </button>
  );
}
