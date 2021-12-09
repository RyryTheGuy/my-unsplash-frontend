import React from "react";
import Masonry from "react-masonry-component";
import { ImageCard } from "./ImageCard/ImageCard";
import { Modal } from "../Modal/Modal";
import { ButtonSecondary } from "../Buttons/ButtonSecondary";

import carPic from '../../assets/firefox_2021-10-19_22-10-51.png';
import colePic from '../../assets/Discord_2021-10-26_22-39-44.png';
import iyanPic from '../../assets/10563067_665363856893211_469939799997423436_n2.jpg';


const ImageGrid = () => {
  // make the Masonry layout responsive
  const options = {
    columnWidth: 10,
    horizontalOrder: true,
    percentPosition: true,
  };

  const [ showModal, setShowModal ] = React.useState( false );
  const [ password, setPassword ] = React.useState( '' );
  const [ imageToBeDeleted, setImageToBeDeleted ] = React.useState<string | null>( null );

  const resetState = () => {
    setShowModal( false );
    setPassword( '' );
    setImageToBeDeleted( null );
  };

  const displayModal = ( id: string ) => {
    setImageToBeDeleted( id );
    setShowModal( true );
  };

  const handlePhotoDeletion = ( e: React.SyntheticEvent ) => {
    e.preventDefault();

    // todo: send password to backend and delete the image

  };

  return (
    <>
      <Masonry className="w-full" options={options}>
        <ImageCard id='abc' imageURL={carPic} title="Cool Car Picture" deletePhoto={displayModal} />
        <ImageCard id='abc' imageURL={colePic} title="Some Soy Boy" deletePhoto={displayModal} />
        <ImageCard id='abc' imageURL={colePic} title="Soy again" deletePhoto={displayModal} />
        <ImageCard id='abc' imageURL={carPic} title="Another car" deletePhoto={displayModal} />
        <ImageCard id='abc' imageURL={'https://firebasestorage.googleapis.com/v0/b/image-uploader-bf8fa.appspot.com/o/352c1ea9-d3c1-4256-bd1b-4e574e733252?alt=media&token=8efd6888-fd6d-4c68-a097-d51ec43a237b'} title="Something" deletePhoto={displayModal} />
      </Masonry>

      <Modal show={showModal} close={resetState}>
        <form className="w-full" onSubmit={( e ) => handlePhotoDeletion( e )}>
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