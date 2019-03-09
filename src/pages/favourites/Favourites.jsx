import React from 'react';
import {removeFavourite, openDetailsModal} from '../../actions/beerActions';
import {connect} from 'react-redux';
import { BeerItem } from '../../components/beer-item/BeerItem';

class Favourites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedBeer: {}
    }
  }

  handleFavouriteClick = item => {
    this.props.removeFavourite(item);
  }

  itemSelected = item => {
    this.props.openDetailsModal(item);
  }

  render() {
    const {favourites} = this.props;
    return (
      <div className="favourites__content">
        <div className="beer-list">
        {favourites && favourites.map(item => (
            <BeerItem item={item}
                      itemSelected={() => this.itemSelected(item)}
                      isFavourite={true}
                      handleFavouriteClick={() => this.handleFavouriteClick(item)}>
            </BeerItem>
          ))}
        </div>
      </div>
    ); 
  }
}

const mapStateToProps = state => ({
  favourites: state.beerBank.favourites
})

const mapDispatchToProps = dispatch => ({
  removeFavourite: (item) => dispatch(removeFavourite(item)),
  openDetailsModal: (beer) => dispatch(openDetailsModal(beer))
})

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)