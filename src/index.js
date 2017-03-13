import React from 'react';
window.React = React;
import ReactDOM from 'react-dom';
import AppShell from './AppShell';
import { ReactPWA } from './ReactPWA';
import './index.css';

const config = {
  '/': {
    moduleUrl: 'home.js',
    styleUrl: '/home.css',
  },
  '/about': {
    moduleUrl: '/about.js',
    styleUrl: '/about.css',
  },
}

const Loader = () => {
  return <div>LOADING...</div>;
}

ReactDOM.render(
  <ReactPWA
    AppShell={AppShell}
    config={config}
    loading={Loader}
  />
  , document.getElementById('root')
);
