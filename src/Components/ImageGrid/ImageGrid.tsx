import React from "react";
import Masonry from "react-masonry-component";
import { ImageCard } from "./ImageCard/ImageCard";

import carPic from '../../assets/firefox_2021-10-19_22-10-51.png';
import colePic from '../../assets/Discord_2021-10-26_22-39-44.png';
import iyanPic from '../../assets/10563067_665363856893211_469939799997423436_n2.jpg';


const ImageGrid = () => {
  // make the layout responsive
  const options = {
    columnWidth: 10,
    horizontalOrder: true,
    percentPosition: true,
  };

  return (
    <Masonry className="w-full" options={options}>
      <ImageCard image={carPic} title="Cool Car Picture" />
      <ImageCard image={colePic} title="Some Soy Boy" />
      <ImageCard image={iyanPic} title="Iyan, or someone" />
      <ImageCard image={colePic} title="Soy again" />
      <ImageCard image={carPic} title="Another car" />
      <ImageCard image={'https://firebasestorage.googleapis.com/v0/b/image-uploader-bf8fa.appspot.com/o/352c1ea9-d3c1-4256-bd1b-4e574e733252?alt=media&token=8efd6888-fd6d-4c68-a097-d51ec43a237b'} title="Something" />
    </Masonry>
  );
};

export { ImageGrid };