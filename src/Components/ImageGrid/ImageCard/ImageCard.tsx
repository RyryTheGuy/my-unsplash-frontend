import React from "react";
import LazyLoad from 'react-lazyload';

interface Props {
  id: string;
  imageURL: string;
  title: string;
  deletePhoto: ( id: string ) => void;
}

const ImageCard = ( { id, imageURL, title, deletePhoto }: Props ) => {
  const [ showOverlay, setShowOverlay ] = React.useState( false );
  const img = React.useRef<HTMLImageElement>( null );

  return (
    // https://www.npmjs.com/package/react-lazyload
    <LazyLoad height={img.current?.naturalHeight} style={{ marginBottom: '1rem' }} once>
      <div
        onMouseEnter={() => setShowOverlay( true )}
        onMouseLeave={() => setShowOverlay( false )}
        className="relative rounded-xl"
      >
        <img src={imageURL} ref={img} className='w-full rounded-xl' />
        <div
          id="overlay"
          style={{ display: showOverlay ? "inline-block" : "none" }}
          className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 text-white rounded-xl'
        >
          <div className="flex flex-col justify-between w-full h-full">
            <div id="image-delete" className="text-right p-4">
              <button className="border border-red-500 text-red-500 rounded-2xl px-4 py-1" onClick={() => deletePhoto( id )}>Delete</button>
            </div>

            <div id="image-title" className="px-4 py-2 text-3xl">
              {title}
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
};

export { ImageCard };