import React from "react";
import imageService from "./services/images";
import { Navbar } from "./Components/Navbar/Navbar";
import { ImageGrid } from "./Components/ImageGrid/ImageGrid";
import { INotification } from "./Components/Notification/Notification";

export interface IImage {
  id: string;
  title: string;
  url: string;
  date?: Date;
}

const App = () => {
  const [ images, setImages ] = React.useState<IImage[]>( [] );
  const [ titleSearch, setTitleSearch ] = React.useState<string>( '' );
  const [ notification, setNotification ] = React.useState<INotification>( {
    message: null,
    isError: false,
  } );

  React.useEffect( () => {
    imageService.getImages()
      .then( response => setImages( response.images ) )
      .catch( e => console.error( e ) );
  }, [] );

  return (
    <div className="px-12 sm:px-2 font-noto">
      <Navbar
        titleSearch={titleSearch}
        notification={notification}
        handleNewImage={( image: IImage ) => setImages( [ image, ...images ] )}
        handleSearchChange={( s: string ) => setTitleSearch( s )}
        setNotification={setNotification}
      />

      <ImageGrid
        images={images}
        titleSearch={titleSearch}
        notification={notification}
        handleImageDeletion={( id: string ) => setImages( images.filter( i => i.id !== id ) )}
        setNotification={setNotification}
      />
    </div>
  );
};

export { App };