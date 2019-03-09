import React from 'react';
import './modal.scss';
import {connect} from 'react-redux';
import { BeerDetails } from '../details/BeerDetails';
import {closeDetailsModal} from '../../actions/beerActions';

class Modal extends React.Component {

  handleClose = () => {
    this.props.closeModal();
  }

  render() {
    const {isOpen, beer, similarBeers, isFetchingSimilarBeers} = this.props;
    return (
      <div className={isOpen ? 'modal show' : 'modal hide'} onClick={this.handleClose}>
        <div className='modal-main' onClick={event => event.stopPropagation()}>
          <BeerDetails beer={beer} similarBeers={similarBeers} isFetchingSimilarBeers={isFetchingSimilarBeers}></BeerDetails>
          <span className="button-close" onClick={this.handleClose}></span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.beerBank.modal.isOpen,
  beer: state.beerBank.modal.beer,
  similarBeers: state.beerBank.modal.similarBeers,
  isFetchingSimilarBeers: state.beerBank.modal.isFetchingSimilarBeers
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeDetailsModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)

