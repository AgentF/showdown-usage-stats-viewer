/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import PokémonList from './components/PokémonList';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <PokémonList />
  </React.StrictMode>,
  document.getElementById('root'),
);
