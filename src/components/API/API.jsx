import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com';
const KEY = '34571804-15b594ccd9e8c9a81bc1227fe';
export const getImages = async ({ image, perPage, currentPage }) => {
  const response = await fetch(
    `${BASE_URL}/api/?q=${image}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  if (!response.ok) {
    throw new Error('Smth went wrong');
  }

  return response.json();
};

getImages.propTypes = {
  image: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
