import React from "react";
import isURL from 'validator/lib/isURL';
import MyUnsplashSVG from '../../assets/my_unsplash_logo.svg';
import imageService from '../../services/images';
import { Modal } from "../Modal/Modal";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import { IImage } from "../../App";
import { AddImageForm } from '../AddImageForm/AddImageForm';
import { INotification } from "../Notification/Notification";

interface IProps {
  handleNewImage: ( i: IImage ) => void;
  titleSearch: string;
  handleSearchChange: ( s: string ) => void;
}

const Navbar = ( { handleNewImage, titleSearch, handleSearchChange }: IProps ) => {
  const [ showModal, setShowModal ] = React.useState<boolean>( false );
  const [ notification, setNotification ] = React.useState<INotification>( {
    message: null,
    isError: true
  } );
  const [ imageTitle, setImageTitle ] = React.useState<string>( '' );
  const [ imageURL, setImageURL ] = React.useState<string>( '' );

  const resetState = () => {
    setShowModal( false );
    setImageTitle( '' );
    setImageURL( '' );
    setNotification( { ...notification, message: null } );
  };

  const handleSubmit = ( e: React.SyntheticEvent ) => {
    e.preventDefault();
    if ( !isURL( imageURL, { require_protocol: true } ) ) {
      setNotification( { message: 'Please enter a valid URL', isError: true } );
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

  return (
    <nav className="flex p-8 align-middle items-center">
      <div id="logo" className="h-full w-auto">
        <img src={MyUnsplashSVG} alt="My Unsplash Logo" className="w-full h-full" />
      </div>
      <div className="flex pl-5 w-full justify-between align-middle items-center">
        <div id="searchBar" className="flex align-middle items-center border-2 border-solid rounded-lg focus-within:border-gray-500 border-gray-300 h-full">
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
        <ButtonPrimary id="addButton" onClick={() => setShowModal( true )} >
          Add an Image
        </ButtonPrimary>
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