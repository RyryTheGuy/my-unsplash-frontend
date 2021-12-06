import React from "react";
import './index.css';
import LazyLoad from 'react-lazyload';

interface Props {
  image: any;
  title: string;
}

interface LazyLoadWithRef extends LazyLoad {
  ref: HTMLDivElement;
}

const ImageCard = ( { image, title }: Props ) => {
  const [ showOverlay, setShowOverlay ] = React.useState( false );
  const img = React.useRef<HTMLImageElement>( null );
  const card = React.useRef<LazyLoadWithRef>( null );

  const deleteCard = () => {
    if ( card.current ) {
      // FIXME: Add a way to remove the image from the database/storage
      card.current.ref.remove();
    } else {
      throw new Error( 'Unable to delete the image at this time. Try again later' );
    }
  };

  return (
    // https://www.npmjs.com/package/react-lazyload
    <LazyLoad ref={card} height={img.current?.naturalHeight} style={{ width: `31%`, margin: '0 .75rem 1rem 0' }} once>
      <div
        onMouseEnter={() => setShowOverlay( true )}
        onMouseLeave={() => setShowOverlay( false )}
        className="relative rounded-xl"
      >
        <img src={image} ref={img} className='w-full rounded-xl' />
        <div
          id="overlay"
          style={{ display: showOverlay ? "inline-block" : "none" }}
          className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 text-white rounded-xl'
        >
          <div className="flex flex-col justify-between w-full h-full">
            <div id="image-delete" className="text-right p-4">
              <button className="border border-red-500 text-red-500 rounded-2xl px-4 py-1" onClick={deleteCard}>Delete</button>
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