import React from "react";
import MyUnsplashSVG from '../../assets/my_unsplash_logo.svg';
import { Modal } from "../Modal/Modal";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";

const Navbar = () => {
  const [ showModal, setShowModal ] = React.useState( false );

  const handleSubmit = ( e: React.SyntheticEvent ) => {
    e.preventDefault();

    console.log( 'Submit' );
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
            name="imageName"
            id="imageNameInput"
            placeholder="Search by name"
            className="bg-transparent outline-none py-3 px-5 h-full"
          />
        </div>
        <ButtonPrimary id="addButton" onClick={() => setShowModal( true )} >
          Add a photo
        </ButtonPrimary>
      </div>

      <Modal show={showModal} close={() => setShowModal( false )}>
        <form className="w-full" onSubmit={( e ) => handleSubmit( e )}>
          <h2 className="text-2xl mb-5">Add a new photo</h2>
          <div className="flex flex-col">
            <label htmlFor="photo-name" className="mb-3">Name of photo</label>
            <input
              id="photo-name"
              name="photo-name"
              className="border border-black rounded-lg outline-none px-4 py-3 mb-5"
              placeholder="Title/Name of the photo. Example: 'My breakfast this morning'"
            />
            <label htmlFor="photo-url" className="mb-3">Photo URL</label>
            <input
              id="photo-url"
              name="photo-url"
              className="border border-black rounded-lg outline-none px-4 py-3 mb-5"
              placeholder="https://images.unsplash.com/photo-7589278432942..."
            />
            <ButtonPrimary type="submit">Submit</ButtonPrimary>
          </div>
        </form>
      </Modal>
    </nav>
  );
};

export { Navbar };