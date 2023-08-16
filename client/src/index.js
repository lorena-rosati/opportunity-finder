import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); //creates route for rendering react application
root.render( //app component is rendered
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

