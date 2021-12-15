import React from "react";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";

interface IProps {
  imageTitle: string;
  imageURL: string;
  handleSubmit: ( e: React.SyntheticEvent ) => void;
  handleTitleChange: ( value: string ) => void;
  handleImageURLChange: ( value: string ) => void;
}

const AddImageForm = ( { imageTitle, imageURL, handleSubmit, handleTitleChange, handleImageURLChange }: IProps ) => {
  return (
    <form className="w-full" onSubmit={( e ) => handleSubmit( e )}>
      <h2 className="text-2xl mb-5">Add a new image</h2>
      <div className="flex flex-col">
        <label htmlFor="image-title" className="mb-3">Title of image</label>
        <input
          id="image-title"
          name="image-title"
          value={imageTitle}
          onChange={( e ) => handleTitleChange( e.target.value )}
          className="border border-black rounded-lg outline-none px-4 py-3 mb-5"
          placeholder="Title/Name of the image. Example: 'My breakfast this morning'"
        />
        <label htmlFor="image-url" className="mb-3">Image URL</label>
        <input
          id="image-url"
          name="image-url"
          value={imageURL}
          onChange={( e ) => handleImageURLChange( e.target.value )}
          className="border border-black rounded-lg outline-none px-4 py-3 mb-5"
          placeholder="https://images.unsplash.com/image-7589278432942..."
        />
        <ButtonPrimary type="submit">Submit</ButtonPrimary>
      </div>
    </form>
  );
};

export { AddImageForm };