import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

export class App extends Component {
  state = {
    image: '',
  };

  handelFormSubmit = image => {
    this.setState({ image });
  };

  render() {
    const { image } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handelFormSubmit} />
        <ImageGallery image={image} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
