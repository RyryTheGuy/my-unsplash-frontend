import axios from 'axios';
const baseURL = 'http://localhost:3001/';

const getImages = async () => {
  const response = await axios.get(baseURL);
  return response;
};

const postImage = async (url: string) => {
  const { data: response } = await axios.post(baseURL, { url }, { headers: { "Content-Type": 'application/json' }});
  return response;
};

const deleteImage = async (password: string, id: string) => {
  const { data: response } = await axios.delete(baseURL, {
    data: { id, password }
  });
  return response;
};

export { getImages, postImage, deleteImage };