import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import MontyHall from "./components/MontyHall";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <MontyHall />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
