import React from "react";
import './index.css';
import LazyLoad from 'react-lazyload';

interface Props {
  image: any;
}

const ImageCard = ( { image }: Props ) => {
  const [ showOverlay, setShowOverlay ] = React.useState( false );
  const img = React.useRef<HTMLImageElement>( null );

  return (
    <LazyLoad height={400} once>
      <div
        onMouseEnter={() => setShowOverlay( true )}
        onMouseLeave={() => setShowOverlay( false )}
        className="relative rounded-xl"
        style={{ width: img.current?.naturalWidth + "px" }}
      >
        <img src={image} ref={img} className='w-auto rounded-xl' />
        <div
          id="overlay"
          style={{ display: showOverlay ? "inline-block" : "none" }}
          className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 text-white rounded-xl'
        >
          <div className="flex flex-col justify-between w-full h-full">
            <div id="image-delete" className="text-right p-4">
              <button className="border border-red-500 text-red-500 rounded-2xl px-4 py-1">Delete</button>
            </div>

            <div id="image-title" className="px-4 py-2">
              This is the Image title which will be dynamic!!
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
};

export { ImageCard };