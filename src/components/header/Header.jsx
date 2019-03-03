import React from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss';

export class Header extends React.Component {
    render() {
      return (
        <nav className={'navigation-menu'}>
          <ul>
            <li><NavLink exact to='/'>HOME</NavLink></li>
            <li><NavLink exact to='/favourite'>FAVOURITE</NavLink></li>
          </ul>
        </nav>
      );
    }
}