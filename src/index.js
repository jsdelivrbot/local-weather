import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import '../styles/style.css'
import backgroundImage from '../assets/images/background-image.jpg'

import App from './components/app'

ReactDOM.render(
  <div className="container">
    <App />
  </div>
  , document.querySelector('.container')
);