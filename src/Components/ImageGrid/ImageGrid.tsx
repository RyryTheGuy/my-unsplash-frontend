import React from "react";
import Masonry from "react-masonry-css";
import './index.css';
import imageService from "../../services/images";
import { ImageCard } from "./ImageCard/ImageCard";
import { Modal } from "../Modal/Modal";
import { ButtonSecondary } from "../Buttons/ButtonSecondary";
import { IImage } from "../../App";

interface IProps {
  images: IImage[];
  handleImageDeletion: ( id: string ) => void;
}

interface IDeleteResponse {
  imageDeletedId: string;
}

const ImageGrid = ( { images, handleImageDeletion }: IProps ) => {
  // todo: make the Masonry layout responsive
  // Masonry options
  // const options = {
  //   percentPosition: true,
  //   columnWidth: 10,
  //   gutter: 15,
  // };

  const [ showModal, setShowModal ] = React.useState( false );
  const [ password, setPassword ] = React.useState( '' );
  const [ imageToBeDeleted, setImageToBeDeleted ] = React.useState<string | null>( null );

  const resetState = () => {
    setShowModal( false );
    setPassword( '' );
    setImageToBeDeleted( null );
  };

  // Called when the 'delete' button is pressed on an image
  const displayModal = ( id: string ) => {
    setImageToBeDeleted( id );
    setShowModal( true );
  };

  const imageDeletion = ( e: React.SyntheticEvent ) => {
    e.preventDefault();

    if ( imageToBeDeleted ) {
      imageService.deleteImage( password, imageToBeDeleted )
        .then( ( response: IDeleteResponse ) => {
          handleImageDeletion( response.imageDeletedId );
          resetState();
        } )
        .catch( e => { throw new Error( e ); } );   // TODO: tell the user the password was wrong
    } else {
      throw new Error( 'Image cannot be deleted. Please try again later.' );
    }
  };

  // Loop through images and display them in a card
  const renderImages = () => {
    if ( images.length > 0 ) {
      return images.map( image => (
        <ImageCard
          key={image.id}
          id={image.id}
          title={image.title}
          imageURL={image.url}
          deletePhoto={displayModal}
        />
      ) );
    }
  };

  return (
    <>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {renderImages()}
      </Masonry>

      <Modal show={showModal} close={resetState}>
        <form className="w-full" onSubmit={( e ) => imageDeletion( e )}>
          <h2 className="text-2xl mb-5">Are you sure?</h2>
          <div className="flex flex-col">
            <label htmlFor="delete-password" className="mb-3">Password</label>
            <input
              id="delete-password"
              name="delete-password"
              type="password"
              className="border border-black rounded-lg outline-none px-4 py-3 mb-5"
              value={password}
              onChange={( e ) => setPassword( e.target.value )}
            />
            <ButtonSecondary type="submit">Delete</ButtonSecondary>
          </div>
        </form>
      </Modal>
    </>
  );
};

export { ImageGrid };