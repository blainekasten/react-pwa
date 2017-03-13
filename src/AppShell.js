import React, { Component } from 'react';
import { Link } from './ReactPWA';
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
        </div>
        <div className="body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
