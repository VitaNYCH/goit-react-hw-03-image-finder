import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    image: null,
  };

  componentDidMount() {
    fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=34571804-15b594ccd9e8c9a81bc1227fe&image_type=photo&orientation=horizontal&per_page=12'
    )
      .then(res => res.json())
      .then(image => this.setState({ image }));
  }
  render() {
    return (
      <div className={css.App}>
        <Searchbar />
      </div>
    );
  }
}
