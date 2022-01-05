import React from "react";
import imageService from "./services/images";
import { Navbar } from "./Components/Navbar/Navbar";
import { ImageGrid } from "./Components/ImageGrid/ImageGrid";

export interface IImage {
  id: string;
  title: string;
  url: string;
  date?: Date;
}

const App = () => {
  const [ images, setImages ] = React.useState<IImage[]>( [] );
  const [ titleSearch, setTitleSearch ] = React.useState<string>( '' );

  React.useEffect( () => {
    imageService.getImages()
      .then( response => setImages( response.images ) )
      .catch( e => console.log( e ) );
  }, [] );

  return (
    <div className="px-12 sm:px-2 font-noto">
      <Navbar
        handleNewImage={( image: IImage ) => setImages( [ image, ...images ] )}
        titleSearch={titleSearch}
        handleSearchChange={( s: string ) => setTitleSearch( s )}
      />

      <ImageGrid
        images={images}
        handleImageDeletion={( id: string ) => setImages( images.filter( i => i.id !== id ) )}
        titleSearch={titleSearch}
      />
    </div>
  );
};

export { App };