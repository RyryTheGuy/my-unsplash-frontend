import React from "react";
import imageService from "../../services/images";
import { Modal } from "../Modal/Modal";
import { IImage } from "../../App";
import { INotification } from "../Notification/Notification";
import { DeleteImageForm } from "../DeleteImageForm/DeleteImageForm";
import { RenderedImages } from "./RenderedImages/RenderedImages";

interface Props {
  images: IImage[];
  notification: INotification;
  titleSearch: string;
  handleImageDeletion: ( id: string ) => void;
  setNotification: ( obj: INotification ) => void;
}

interface IDeleteResponse {
  imageDeletedId: string;
}

const ImageGrid = ( { images, titleSearch, notification, handleImageDeletion, setNotification }: Props ) => {
  const [ showModal, setShowModal ] = React.useState( false );
  const [ password, setPassword ] = React.useState( '' );
  const [ imageToBeDeleted, setImageToBeDeleted ] = React.useState<string | null>( null );
  const [ successfulDelete, setSuccessfulDelete ] = React.useState<boolean>( false );

  const filteredImages = images.filter( i => i.title.toLowerCase().includes( titleSearch ) );

  /**
   * Resets the state of the component
   */
  const resetState = () => {
    setShowModal( false );
    setPassword( '' );
    setImageToBeDeleted( null );
    setSuccessfulDelete( false );
    setNotification( { ...notification, message: null } );
  };

  /**
   * Shows the modal to the user and captures the image that will be deleted
   * @param id String
   */
  const displayModal = ( id: string ) => {
    setImageToBeDeleted( id );
    setShowModal( true );
  };

  /**
   * Deletes a specific image when given the correct password
   * @param e Event Handler
   */
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
      setNotification( {
        message: 'Image cannot be deleted. Please try again later.',
        isError: true,
      } );
    }
  };

  return (
    <>
      {images.length === 0
        ? null
        : <RenderedImages
          filteredImages={filteredImages}
          titleSearch={titleSearch}
          displayModal={displayModal}
        />
      }

      <Modal show={showModal} close={resetState}>
        <DeleteImageForm
          password={password}
          notification={notification}
          successfulDelete={successfulDelete}
          handlePasswordChange={setPassword}
          handleSubmit={imageDeletion}
          hideNotification={() => setNotification( { ...notification, message: null } )}
        />
      </Modal>
    </>
  );
};

export { ImageGrid };