import React from "react";
import imageService from "./services/images";
import { Navbar } from "./Components/Navbar/Navbar";
import { ImageGrid } from "./Components/ImageGrid/ImageGrid";

// todo: make a types file?
export interface IImage {
  id: string;
  title: string;
  url: string;
  date?: Date;
}

const App = () => {
  const [ images, setImages ] = React.useState<IImage[]>( [] );

  React.useEffect( () => {
    imageService.getImages()
      .then( response => setImages( response.images ) )
      .catch( e => console.log( e ) );
  }, [] );

  return (
    <div className="px-12 font-noto">
      <Navbar
        handleNewImage={( image: IImage ) => setImages( [ image, ...images ] )}
      />

      <ImageGrid
        images={images}
        handleImageDeletion={( id: string ) => setImages( images.filter( i => i.id !== id ) )}
      />
    </div>
  );
};

export { App };