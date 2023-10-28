import axios from 'axios';
const API_KEY = '19008489-eef4c530baed43ae206c47500';

export const fetchImages = async (q, page) => {
  const res = await axios.get(
    `https://pixabay.com/api/?q=${q}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return res.data.hits;
};
