import React from 'react';
import './modal.scss';

export class Modal extends React.Component {
  render() {
    const {show, children, handleClose} = this.props;
    return (
      <div className={show ? 'modal show' : 'modal hide'} onClick={handleClose}>
        <div className='modal-main' onClick={event => event.stopPropagation()}>
          {children}
          <span className="button-close" onClick={handleClose}></span>
        </div>
      </div>
    );
  }
}