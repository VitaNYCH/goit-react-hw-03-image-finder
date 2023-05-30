import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    image: '',
  };

  handelChange = e => {
    this.setState({ image: e.currentTarget.value.toLowerCase() });
  };

  handelSubmit = e => {
    e.preventDefault();
    if (this.state.image.trim() === '') {
      toast.error('Please enter the name');
      return;
    }
    this.props.onSubmit(this.state.image);
    this.setState({ image: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handelSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <FaSearch style={{ width: 24, height: 24 }} />
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            placeholder="Search images and photos"
            onChange={this.handelChange}
          />
        </form>
      </header>
    );
  }
}
