import PropTypes from 'prop-types';
import React from 'react';
import css from './Button.module.css';
export function Button({ handleLoadMore, status, pendingStatus }) {
  return (
    <button type="button" className={css.Button} onClick={handleLoadMore}>
      {status === pendingStatus ? 'Loading...' : 'Load More'}
    </button>
  );
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  pendingStatus: PropTypes.string.isRequired,
};
