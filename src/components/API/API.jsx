const BASE_URL = 'https://pixabay.com';
const KEY = '34571804-15b594ccd9e8c9a81bc1227fe';
export const getImages = async () => {
  const response = await fetch(
    `${BASE_URL}/api/?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (!response.ok) {
    throw new Error('Smth went wrong');
  }

  return response.json();
};
