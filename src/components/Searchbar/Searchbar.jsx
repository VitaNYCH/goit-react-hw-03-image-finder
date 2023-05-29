import React from 'react';
import css from './Searchbar.module.css';
export const Searchbar = () => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}></button>
        <span className={css.SearchFormButtonLabel}>Search</span>
        <input
          className={css.SearchFormInput}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
