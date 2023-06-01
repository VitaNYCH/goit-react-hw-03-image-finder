import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { getImages } from 'components/API';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import css from './ImageGallery.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    hits: [],
    error: null,
    status: STATUS.IDLE,
    currentPage: 1,
    totalPages: 0,
    perPage: 12,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;
    const prevImage = prevProps.image;
    const nextImage = this.props.image;

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
        throw Error(`No matches found with "${this.props.image}"`);
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
  render() {
    const { hits, error, status, currentPage, totalPages } = this.state;
    if (status === STATUS.IDLE) {
      return <h2 className={css.request}>Please enter what you looking for</h2>;
    }
    if (status === STATUS.PENDING) {
      return <Loader />;
    }
    if (status === STATUS.REJECTED) {
      return <h1>{error}</h1>;
    }
    if (status === STATUS.RESOLVED) {
      const showLoadMoreButton = hits.legth !== 0 && currentPage < totalPages;
      return (
        <>
          <ul className={css.ImageGallery}>
            {hits.map(({ largeImageURL, tags, webformatURL, id }) => (
              <li className={css.ImageGalleryItem} key={id}>
                <ImageGalleryItem
                  largeImageURL={largeImageURL}
                  tags={tags}
                  webformatURL={webformatURL}
                />
              </li>
            ))}
          </ul>
          {showLoadMoreButton && (
            <Button
              handleLoadMore={this.handleLoadMore}
              status={status}
              pendingStatus={STATUS.PENDING}
              disabled={status === STATUS.PENDING ? true : false}
            />
          )}
        </>
      );
    }
  }
}
