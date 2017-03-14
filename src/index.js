import React from 'react';
window.React = React;
import ReactDOM from 'react-dom';
import AppShell from './AppShell';
import { ProgressiveWebApp } from './ReactPWA';
import './index.css';

const config = {
  '/': {
    moduleUrl: 'home.js',
    styleUrl: '/home.css',
    dataPrefetchUrl: '/home-prefetch.json'
  },
  '/about': {
    moduleUrl: '/about.js',
    styleUrl: '/about.css',
  },
  '/fail': {
    moduleUrl: 'fail.js',
    styleUrl: '/fail.css',
  },
};

const Loader = () => {
  return <div>LOADING...</div>;
};

const Error = (props) => {
  return (
    <div>
      <h1>ERRORRRRRRRR</h1>
      <p>{props.error.message}</p>
    </div>
  );
};

ReactDOM.render(
  <ProgressiveWebApp
    AppShell={AppShell}
    config={config}
    Loader={Loader}
    Error={Error}
  />
  , document.getElementById('root')
);
