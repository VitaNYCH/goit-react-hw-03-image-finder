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
// const BASE_URL = 'https://pixabay.com';
// const KEY = '34571804-15b594ccd9e8c9a81bc1227fe';

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
    console.log(prevImage);
    const nextImage = this.props.image;
    console.log(this.props.image);
    if (prevImage !== nextImage) {
      await this.setState({ currentPage: 1, hits: [] });
      this.fetchImages(nextImage);
    }
    if (prevState.currentPage !== currentPage) {
      this.fetchProducts();
    }
  }

  fetchImages = async image => {
    const { perPage, currentPage, hits } = this.state;
    await this.setState({ status: STATUS.PENDING });

    // const addImage = currentPage * perPage;
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
      console.log(this.state.hits);
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.REJECTED });
    }
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   const { image } = this.props;
  //   const prevImage = prevProps.image;
  //   const nextImage = image;
  //   const { perPage, currentPage } = this.state;

  //   if (prevImage !== nextImage) {
  //     fetch(
  //       `${BASE_URL}/api/?q=${nextImage}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  //     )
  //       .then(res => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(new Error(`No matches with ${nextImage}`));
  //       })
  //       .then(imageItem =>
  //         this.setState({
  //           imageItem,
  //           totalPages: Math.ceil(imageItem.total / this.state.perPage),
  //           status: STATUS.RESOLVED,
  //         })
  //       )
  //       .catch(error => this.setState({ error, status: STATUS.REJECTED }));
  //   }
  // }

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      // perPage: prevState.perPage + 12,
    }));
  };
  render() {
    const { hits, error, status, currentPage, totalPages } = this.state;
    console.log(hits);
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
      // const showLoadMoreButton = hits.total == 0 && currentPage < totalPages;
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

          <Button
            handleLoadMore={this.handleLoadMore}
            status={status}
            pendingStatus={STATUS.PENDING}
          />
        </>
      );
    }
  }
}
