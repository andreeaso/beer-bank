import React, { Component } from 'react';
import {Header} from './components/header/Header';
import Modal from './components/modal/Modal';

export class App extends Component {
  render() {
    return (
      <div className='main'>
          <Header/>
          {this.props.children}
          <Modal/>
      </div>
    );
  }
}
