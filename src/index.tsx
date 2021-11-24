import React from "react";
import { render } from "react-dom";
import { App } from './App';
import 'tailwindcss/tailwind.css';

render(
  < React.StrictMode >
    <App />
  </React.StrictMode >,
  document.getElementById( 'root' )
);