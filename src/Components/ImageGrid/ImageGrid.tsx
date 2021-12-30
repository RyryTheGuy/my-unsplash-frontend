import React from "react";
import Masonry from "react-masonry-css";
import './index.css';
import imageService from "../../services/images";
import { ImageCard } from "./ImageCard/ImageCard";
import { Modal } from "../Modal/Modal";
import { IImage } from "../../App";
import { INotification } from "../Notification/Notification";
import { DeleteImageForm } from "../DeleteImageForm/DeleteImageForm";

interface Props {
  images: IImage[];
  handleImageDeletion: ( id: string ) => void;
  titleSearch: string;
}

interface IDeleteResponse {
  imageDeletedId: string;
}

// todo: make the Masonry layout responsive
const ImageGrid = ( { images, handleImageDeletion, titleSearch }: Props ) => {
  const [ showModal, setShowModal ] = React.useState( false );
  const [ notification, setNotification ] = React.useState<INotification>( {
    message: null,
    isError: true
  } );
  const [ password, setPassword ] = React.useState( '' );
  const [ imageToBeDeleted, setImageToBeDeleted ] = React.useState<string | null>( null );
  const [ successfulDelete, setSuccessfulDelete ] = React.useState<boolean>( false );

  const filteredImages = images.filter( i => i.title.includes( titleSearch ) );

  const resetState = () => {
    setShowModal( false );
    setPassword( '' );
    setImageToBeDeleted( null );
    setSuccessfulDelete( false );
    setNotification( { ...notification, message: null } );
  };

  // Called when the 'delete' button is pressed on an image
  const displayModal = ( id: string ) => {
    setImageToBeDeleted( id );
    setShowModal( true );
  };

  // Called when a password is given to the delete prompt
  const imageDeletion = ( e: React.SyntheticEvent ) => {
    e.preventDefault();

    if ( imageToBeDeleted ) {
      imageService.deleteImage( password, imageToBeDeleted )
        .then( ( response: IDeleteResponse ) => {
          setSuccessfulDelete( true );
          handleImageDeletion( response.imageDeletedId );
          setTimeout( () => {
            resetState();
          }, 3 * 1000 );
        } )
        .catch( _ => {
          setNotification( {
            message: 'Password was incorrect. Unable to delete the image.',
            isError: true
          } );
        } );
    } else {
      console.error( 'Image cannot be deleted. Please try again later.' );
      setNotification( {
        message: 'Image cannot be deleted. Please try again later.',
        isError: true,
      } );
    }
  };

  // Loop through images and display them in a card
  const renderImages = () => {
    if ( images.length < 1 ) return null;
    if ( filteredImages.length > 0 ) {
      return (
        <Masonry
          breakpointCols={3}
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
    }

    return (
      <div className="w-full h-full text-center text-gray-500">
        No results for &quot;{titleSearch}&quot;
      </div>
    );
  };

  return (
    <>
      {renderImages()}

      <Modal show={showModal} close={resetState}>
        {successfulDelete
          ? <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl mb-5">Image successfully deleted!</h2>
            {/* Custom Checkmark made from CSS */}
            <svg id="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle id="checkmark_circle" cx={26} cy={26} r={25} fill="none" />
              <path id="checkmark_check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div> // todo: make this look better. Animated?
          : <DeleteImageForm
            password={password}
            notification={notification}
            handlePasswordChange={setPassword}
            handleSubmit={imageDeletion}
            hideNotification={() => setNotification( { ...notification, message: null } )}
          />
        }
      </Modal>
    </>
  );
};

export { ImageGrid };