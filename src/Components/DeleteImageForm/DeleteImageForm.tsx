import React from "react";
import { ButtonSecondary } from "../Buttons/ButtonSecondary";
import { Notification, INotification } from "../Notification/Notification";
import { SuccessfulDelete } from "./SuccessfulDelete/SuccessfulDelete";

interface Props {
  password: string;
  notification: INotification;
  successfulDelete: boolean;
  handlePasswordChange: ( s: string ) => void;
  handleSubmit: ( e: React.SyntheticEvent ) => void;
  hideNotification: () => void;
}

const DeleteImageForm = ( { password, notification, successfulDelete, handlePasswordChange, handleSubmit, hideNotification }: Props ) => {
  if ( successfulDelete ) {
    return (
      <SuccessfulDelete />
    );
  }

  return (
    <form className="w-full" onSubmit={( e ) => handleSubmit( e )}>
      <Notification message={notification.message} isError={notification.isError} hideNotification={hideNotification} />
      <h2 className="text-2xl mb-5">Are you sure?</h2>
      <div className="flex flex-col">
        <label htmlFor="delete-password" className="mb-3">Password</label>
        <input
          id="delete-password"
          name="delete-password"
          type="password"
          className="border border-black rounded-lg outline-none px-4 py-3 mb-5"
          value={password}
          onChange={( e ) => handlePasswordChange( e.target.value )}
          required
        />
        <ButtonSecondary type="submit">Delete</ButtonSecondary>
      </div>
    </form>
  );
};

export { DeleteImageForm };