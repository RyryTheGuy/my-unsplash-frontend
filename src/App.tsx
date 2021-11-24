import React from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { ImageGrid } from "./Components/ImageGrid/ImageGrid";

const App = () => {
  return (
    <div className="px-12 font-noto">
      <Navbar />

      <ImageGrid />
    </div>
  );
};

export { App };