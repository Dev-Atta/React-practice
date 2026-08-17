import React from 'react';    
import ReactDOM from 'react-dom/client';
 // We have Taken these Two librries To
 // Enable Reacct 


import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); //creactRoot
root.render(
    <App />   
);

// this index.js is automatically loaded to index.html file by react-scripts(Seen In package.json).
