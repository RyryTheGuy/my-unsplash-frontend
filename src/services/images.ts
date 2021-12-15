import axios from 'axios';
import { IImage } from '../App';
const baseURL = 'http://localhost:3001/images';

interface IGetResponse {
  images: IImage[];
}

interface IPostResponse {
  savedImage: IImage;
}

const getImages = async () => {
  const { data: response } = await axios.get<IGetResponse>(baseURL);
  return response;
};

const postImage = async (title: string, url: string) => {
  const { data: response } = await axios.post<IPostResponse>(baseURL, { title, url }, { headers: { "Content-Type": 'application/json' }});
  return response;
};

const deleteImage = async (password: string, id: string) => {
  const { data: response } = await axios.delete(baseURL, {
    data: { password, id }
  });
  return response;
};

export default { getImages, postImage, deleteImage };