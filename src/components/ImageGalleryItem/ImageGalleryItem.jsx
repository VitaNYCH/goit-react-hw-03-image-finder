import React, { Component } from 'react';
import { Modal } from 'components/Modal';
import css from './ImageGalleryItem.module.css';
export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };
  openModal = e => {
    console.log(e.target);
    this.setState({ isOpenModal: true });
  };
  closeModal = () => this.setState({ isOpenModal: false });
  render() {
    const {
      imageItem: { hits },
    } = this.props;
    const { isOpenModal } = this.state;
    return (
      <ul className={css.ImageGallery}>
        {hits.map(hit => (
          <li className={css.ImageGalleryItem} key={hit.id}>
            <img
              onClick={this.openModal}
              id={hit.id}
              src={hit.webformatURL}
              alt={hit.tags}
              className={css.ImageGalleryIteImage}
            />
            {isOpenModal && (
              <Modal onClose={this.closeModal} onOpen={this.openModal}>
                (
                <img
                  id={hit.id}
                  className={css.ModalImg}
                  src={hit.largeImageURL}
                  alt={hit.tags}
                />
                )
              </Modal>
            )}
          </li>
        ))}
      </ul>
    );
  }
}
