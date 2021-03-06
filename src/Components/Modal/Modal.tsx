import React from "react";

interface Props {
  show: boolean;
  close: () => void;
  children?: React.ReactNode;
}

const Modal = ( { show, close, children }: Props ) => {
  const closeModal = ( e: React.SyntheticEvent ) => {
    // Closes the modal if the user clicks outside of the modal
    if ( e.target === e.currentTarget ) {
      close();
    }
  };

  if ( !show ) return null;

  return (
    <div
      id="modal-bg"
      className="fixed top-0 left-0 h-full w-full z-50 bg-black bg-opacity-50 flex justify-center align-middle"
      onClick={( e ) => closeModal( e )}
    >
      <div id="modal-fg" className="bg-white p-8 w-2/5 sm:w-full h-auto m-auto rounded-xl">
        {children}
      </div>
    </div>
  );
};

export { Modal };