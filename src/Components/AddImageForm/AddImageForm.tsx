import React from "react";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import { Notification, INotification } from "../Notification/Notification";

interface Props {
  imageTitle: string;
  imageURL: string;
  notification: INotification;
  handleSubmit: ( e: React.SyntheticEvent ) => void;
  handleTitleChange: ( value: string ) => void;
  handleImageURLChange: ( value: string ) => void;
  hideNotification: () => void;
}

const AddImageForm = ( { imageTitle, imageURL, notification, handleSubmit, handleTitleChange, handleImageURLChange, hideNotification }: Props ) => (
  <form className="w-full" onSubmit={( e ) => handleSubmit( e )}>
    <Notification message={notification.message} isError={notification.isError} hideNotification={hideNotification} />
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
        required
      />

      <label htmlFor="image-url" className="mb-3">Image URL</label>
      <input
        id="image-url"
        name="image-url"
        value={imageURL}
        onChange={( e ) => handleImageURLChange( e.target.value )}
        className="border border-black rounded-lg outline-none px-4 py-3 mb-5"
        placeholder="https://images.unsplash.com/image-7589278432942..."
        required
      />
      <ButtonPrimary type="submit">Submit</ButtonPrimary>
    </div>
  </form>
);

export { AddImageForm };