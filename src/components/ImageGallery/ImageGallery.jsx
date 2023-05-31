import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import css from './ImageGallery.module.css';
export class ImageGallery extends Component {
  state = {
    imageItem: null,
    error: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.image;
    const nextImage = this.props.image;

    if (prevImage !== nextImage) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextImage}&page=1&key=34571804-15b594ccd9e8c9a81bc1227fe&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`No matches with ${nextImage}`));
        })
        .then(imageItem => this.setState({ imageItem, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  render() {
    const { imageItem, error, status } = this.state;
    if (status === 'idle') {
      return <h2 className={css.request}>Please enter what you looking for</h2>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved' && imageItem.total > 0) {
      return (
        <>
          <ImageGalleryItem imageItem={imageItem} />
          <Button />
        </>
      );
    }
    if (status === 'resolved' && imageItem.total === 0) {
      return (
        <h1 className={css.request}>No matches with "{this.props.image}"</h1>
      );
    }
  }
}
