import React from "react";

export interface INotification {
  message: string | null;
  isError: boolean;
}

interface Props extends INotification {
  hideNotification: () => void;
}

const Notification = ( { message, isError, hideNotification }: Props ) => {
  const className = isError
    ? "w-full text-white bg-red-500 mb-4 px-5 py-3 rounded-xl"
    : "w-full text-white bg-green-500 mb-4 px-5 py-3 rounded-xl";

  React.useEffect( () => {
    setTimeout( () => {
      hideNotification();
    }, 5 * 1000 );
  }, [ message ] );

  if ( !message ) return null;

  return (
    <div
      className={className}
    >
      {message}
    </div>
  );
};

export { Notification };