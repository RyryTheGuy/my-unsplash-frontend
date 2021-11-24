import React from "react";
import MyUnsplashSVG from '../../assets/my_unsplash_logo.svg';

const Navbar = () => {
  return (
    // Increase height of navbar by making things larger
    <nav className="flex p-8 align-middle items-center">
      <div id="logo" className="h-full w-auto">
        <img src={MyUnsplashSVG} alt="My Unsplash Logo" className="w-full h-full" />
      </div>
      <div className="flex pl-5 w-full justify-between align-middle items-center">
        <div id="searchBar" className="flex align-middle items-center border-2 border-solid rounded-lg focus-within:border-gray-500 border-gray-300 h-full">
          <i className="material-icons pl-3 text-gray-400">search</i>
          <input
            type="text"
            name="imageName"
            id="imageNameInput"
            placeholder="Search by name"
            className="bg-transparent outline-none py-3 px-5 h-full"
          />
        </div>
        <button id="addButton" className="py-3 px-5 bg-green-500 hover:bg-green-400 text-white rounded-lg shadow-md">
          Add a photo
        </button>
      </div>
    </nav>
  );
};

export { Navbar };