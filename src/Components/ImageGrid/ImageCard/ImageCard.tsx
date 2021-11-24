import React from "react";
import LazyLoad from 'react-lazyload';

interface Props {
  image: any;
}

const ImageCard = ( { image }: Props ) => {
  return (
    <LazyLoad height={400} once>
      <img src={image} />
    </LazyLoad>
  );
};

export { ImageCard };