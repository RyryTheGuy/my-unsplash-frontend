import React from "react";
import isURL from 'validator/lib/isURL';
import MyUnsplashSVG from '../../assets/my_unsplash_logo.svg';
import imageService from '../../services/images';
import { Modal } from "../Modal/Modal";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import { IImage } from "../../App";
import { AddImageForm } from '../AddImageForm/AddImageForm';
import { INotification } from "../Notification/Notification";

interface Props {
  handleNewImage: ( i: IImage ) => void;
  titleSearch: string;
  handleSearchChange: ( s: string ) => void;
}

const Navbar = ( { handleNewImage, titleSearch, handleSearchChange }: Props ) => {
  const [ showModal, setShowModal ] = React.useState<boolean>( false );
  const [ notification, setNotification ] = React.useState<INotification>( {
    message: null,
    isError: true
  } );
  const [ imageTitle, setImageTitle ] = React.useState<string>( '' );
  const [ imageURL, setImageURL ] = React.useState<string>( '' );
  const [ matchMedia, setMatchMedia ] = React.useState<boolean>( window.matchMedia( "(max-width: 637px)" ).matches );

  React.useEffect( () => {
    window.matchMedia( "(max-width: 637px)" ).addEventListener( 'change', e => setMatchMedia( e.matches ) );
  } );

  /**
   * Resets the state of the component
   */
  const resetState = () => {
    setShowModal( false );
    setImageTitle( '' );
    setImageURL( '' );
    setNotification( { ...notification, message: null } );
  };

  /**
   * Handles the submit of adding a new Image URL to the database
   * @param e Event Object
   * @returns void
   */
  const handleSubmit = ( e: React.SyntheticEvent ) => {
    e.preventDefault();

    // Data validate the image url
    if ( !validateURL( imageURL ) ) {
      setNotification( { message: 'Please enter a valid Image URL', isError: true } );
      return;
    }

    imageService.postImage( imageTitle, imageURL )
      .then( response => {
        setImageTitle( '' );
        setImageURL( '' );
        setNotification( {
          message: 'Image Upload Successful!',
          isError: false
        } );
        handleNewImage( response.savedImage );
      } )
      .catch( _ => {
        setNotification( {
          message: 'Unable to upload the Image URL. Please try again later.',
          isError: true
        } );
      } );
  };

  /**
   * Validates the image URL by making sure it's a valid URL and an image link
   * @param url The image URL the user wants to upload
   * @returns boolean
   */
  const validateURL = ( url: string ): boolean => {
    const supportedImageFiles: string[] = [ 'jpeg', 'jpg', 'png', 'svg', 'webp' ];
    if ( !isURL( url, { require_protocol: true } ) ) return false;
    if ( !supportedImageFiles.some( file => url.includes( file ) ) ) return false;

    return true;
  };

  return (
    <nav className="flex sm:flex-col p-8 sm:px-0 sm:py-4 align-middle items-center">
      <div id="logo" className="h-full w-auto pr-5 sm:p-0 sm:pb-2">
        <img src={MyUnsplashSVG} alt="My Unsplash Logo" className="w-full h-full" />
      </div>
      <div className="flex w-full justify-between sm:justify-around align-middle items-center">
        <div id="searchBar" className="flex align-middle items-center mr-2 border-2 border-solid rounded-lg focus-within:border-gray-500 border-gray-300 h-full">
          <i className="material-icons pl-3 text-gray-400">search</i>
          <input
            type="text"
            name="imageTitle"
            id="imageTitleInput"
            placeholder="Search by name"
            className="bg-transparent outline-none py-3 px-5 h-full"
            value={titleSearch}
            onChange={( e ) => handleSearchChange( e.target.value )}
          />
        </div>
        {matchMedia
          ? <ButtonPrimary id="addButton" onClick={() => setShowModal( true )}> + </ButtonPrimary>
          : <ButtonPrimary id="addButton" onClick={() => setShowModal( true )} >
            Add an Image
          </ButtonPrimary>
        }
      </div>

      <Modal show={showModal} close={resetState}>
        <AddImageForm
          imageTitle={imageTitle}
          imageURL={imageURL}
          notification={notification}
          handleSubmit={handleSubmit}
          handleTitleChange={setImageTitle}
          handleImageURLChange={setImageURL}
          hideNotification={() => setNotification( { ...notification, message: null } )}
        />
      </Modal>
    </nav>
  );
};

export { Navbar };