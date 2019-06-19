import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * Props + State => Model
 * Model + Component => DOM (Virtual)
 * DOM Events => Sends back to State and trigger another render cycle
 * 
 * React:
 *  1. Renders UI and Handles event
 *  2. Uses plain javascript for view logic
 *  3. Written in plain javascript
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div onClick={this.props.onClick}>This div clicked {this.props.clicks} times.</div>
        </header>
      </div>
    )
  }
}

export default App;
