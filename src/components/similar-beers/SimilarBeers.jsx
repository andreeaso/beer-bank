import React from 'react';
import {openDetailsModal} from '../../actions/beerActions';
import {connect} from 'react-redux';
import './similarBeers.scss'

class SimilarBeers extends React.Component {
  itemSelected = item => {
    this.props.openDetailsModal(item);
  }

  render() {
    const {beers} = this.props;
    return (
      <div className='similar-beers'>
        <div className="beers">
          {beers && beers.slice(0, 3).map(item => (
              <div className='item' key={item.id} onClick={() => this.itemSelected(item)}>
                <img src={item.image_url} alt={item.name}></img>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    ); 
  }
}

const mapDispatchToProps = dispatch => ({
  openDetailsModal: beer => dispatch(openDetailsModal(beer))
})

export default connect(null, mapDispatchToProps)(SimilarBeers)