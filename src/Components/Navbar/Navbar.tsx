import React from "react";
import MyUnsplashSVG from '../../assets/my_unsplash_logo.svg';
import imageService from '../../services/images';
import { Modal } from "../Modal/Modal";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import { IImage } from "../../App";
import { AddImageForm } from '../AddImageForm/AddImageForm';

interface IProps {
  handleNewImage: ( i: IImage ) => void;
}

const Navbar = ( { handleNewImage }: IProps ) => {
  const [ showModal, setShowModal ] = React.useState<boolean>( false );
  const [ imageTitle, setImageTitle ] = React.useState<string>( '' );
  const [ imageURL, setImageURL ] = React.useState<string>( '' );

  const resetState = () => {
    setShowModal( false );
    setImageTitle( '' );
    setImageURL( '' );
  };

  const handleSubmit = ( e: React.SyntheticEvent ) => {
    e.preventDefault();

    imageService.postImage( imageTitle, imageURL )
      .then( response => {
        handleNewImage( response.savedImage );
        resetState();
      } )
      .catch( e => { throw new Error( e ); } );   // todo: show a user friendly error
  };

  return (
    // Increase height of navbar by making things larger
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
          />
        </div>
        <ButtonPrimary id="addButton" onClick={() => setShowModal( true )} >
          Add an Image
        </ButtonPrimary>
      </div>

      <Modal show={showModal} close={() => setShowModal( false )}>
        <AddImageForm
          imageTitle={imageTitle}
          imageURL={imageURL}
          handleSubmit={handleSubmit}
          handleTitleChange={setImageTitle}
          handleImageURLChange={setImageURL}
        />
      </Modal>
    </nav>
  );
};

export { Navbar };