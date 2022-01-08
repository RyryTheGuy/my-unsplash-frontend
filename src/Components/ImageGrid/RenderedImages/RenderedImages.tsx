import React from 'react';
import Masonry from 'react-masonry-css';
import './index.css';
import { IImage } from '../../../App';
import { ImageCard } from './ImageCard/ImageCard';

interface Props {
  filteredImages: IImage[];
  titleSearch: string;
  displayModal: ( id: string ) => void;
}

const RenderedImages = ( { filteredImages, titleSearch, displayModal }: Props ) => {
  // Makes the Masonry layout responsive
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    637: 1
  };

  // No results found when searching for a title
  if ( filteredImages.length === 0 ) {
    return (
      <div className="w-full h-full text-center text-gray-500">
        No results for &quot;{titleSearch}&quot;
      </div>
    );
  }

  // Displays the filtered images in a Masonry grid
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {filteredImages.map( image => (
        <ImageCard
          key={image.id}
          id={image.id}
          title={image.title}
          imageURL={image.url}
          deletePhoto={displayModal}
        />
      ) )}
    </Masonry>
  );
};

export { RenderedImages };