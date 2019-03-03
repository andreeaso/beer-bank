import React from 'react';
import {removeFavourite} from '../../actions/beerActions';
import {connect} from 'react-redux';
import {Modal} from '../../components/modal/Modal';
import { BeerDetails } from '../../components/details/BeerDetails';
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
    this.setState({showModal: true, selectedBeer: item});
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
        <Modal show={this.state.showModal} handleClose={() => this.setState({showModal: false})}>
          <BeerDetails beer={this.state.selectedBeer}></BeerDetails>
        </Modal>
      </div>
    ); 
  }
}

const mapStateToProps = state => ({
  favourites: state.beerBank.favourites
})

const mapDispatchToProps = dispatch => ({
  removeFavourite: (item) => dispatch(removeFavourite(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)