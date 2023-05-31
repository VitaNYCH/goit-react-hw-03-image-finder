import React, { Component } from 'react';
import { Modal } from 'components/Modal';

import css from './ImageGalleryItem.module.css';
export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };
  openModal = e => {
    this.setState({ isOpenModal: true });
  };
  closeModal = () => this.setState({ isOpenModal: false });
  render() {
    const { largeImageURL, tags, webformatURL } = this.props;
    const { isOpenModal } = this.state;
    return (
      <>
        <img
          onClick={this.openModal}
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryIteImage}
        />
        {isOpenModal && (
          <Modal onClose={this.closeModal}>
            <img className={css.ModalImg} src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
