import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { getImages } from 'components/API';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    image: '',
    hits: [],
    error: null,
    status: STATUS.IDLE,
    currentPage: 1,
    totalPages: 0,
    perPage: 12,
  };

  async componentDidUpdate(_, prevState) {
    const { currentPage } = this.state;
    const prevImage = prevState.image;
    const nextImage = this.state.image;

    if (prevImage !== nextImage) {
      await this.setState({ currentPage: 1, hits: [] });
      this.fetchImages(nextImage);
    }
    if (prevState.currentPage !== currentPage) {
      this.fetchImages(nextImage);
    }
  }

  fetchImages = async image => {
    const { perPage, currentPage, hits } = this.state;
    await this.setState({ status: STATUS.PENDING });
    try {
      const data = await getImages({ image, perPage, currentPage });
      if (data.hits.length === 0) {
        throw Error(`No matches found with "${this.state.image}"`);
      }
      this.setState({
        hits: [...hits, ...data.hits],
        status: STATUS.RESOLVED,
        totalPages: Math.ceil(data.total / perPage),
      });
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.REJECTED });
    }
  };
  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handelFormSubmit = image => {
    this.setState({ image });
  };

  render() {
    const { hits, error, status, currentPage, totalPages } = this.state;
    const showLoadMoreButton = hits.legth !== 0 && currentPage < totalPages;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handelFormSubmit} />

        {status === STATUS.IDLE && (
          <h2 className={css.Request}>Please enter what you looking for</h2>
        )}

        {status === STATUS.PENDING && <Loader />}
        {status === STATUS.REJECTED && (
          <h1 className={css.ErrorTitle}>{error}</h1>
        )}
        {status === STATUS.RESOLVED && <ImageGallery hits={hits} />}
        <ToastContainer autoClose={3000} />
        {showLoadMoreButton && (
          <Button
            handleLoadMore={this.handleLoadMore}
            status={status}
            pendingStatus={STATUS.PENDING}
            disabled={status === STATUS.PENDING ? true : false}
          />
        )}
      </div>
    );
  }
}
