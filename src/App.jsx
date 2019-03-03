import React, { Component } from 'react';
import {Header} from './components/header/Header';

export class App extends Component {
  render() {
    return (
      <div className='main'>
          <Header/>
          {this.props.children}
        </div>
    );
  }
}
