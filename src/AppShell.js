import React, { Component } from 'react';
import { PWALink as Link } from './ReactPWA';
import './style.css';

export default class App extends Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <div className="header">
          <Link to="/">Home</Link>
          <Link to="/about">about</Link>
          <Link to="/fail">Failing URL</Link>
          <Link to="/not-pwa">NOT PWA</Link>
        </div>
        <div className="body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
