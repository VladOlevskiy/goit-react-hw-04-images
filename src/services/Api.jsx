import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '29773664-bbac3ad1105fd49531e6a6409';
const per_page = 12;
export const getImg = async (searchQuery, page = 1) => {
  try {
    const response = await axios.get(
      `${API_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
