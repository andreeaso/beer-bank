import React from 'react';
import './home.scss';
import {getBeers, addFavourite, removeFavourite} from '../../actions/beerActions';
import {connect} from 'react-redux';
import { debounce } from 'throttle-debounce';
import InfiniteScroll from 'react-infinite-scroller';
import { Modal } from '../../components/modal/Modal';
import { BeerDetails } from '../../components/details/BeerDetails';
import { BeerItem } from '../../components/beer-item/BeerItem';
import {Loader} from '../../components/loader/Loader';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      showModal: false,
      selectedBeer: {}
    }
    this.debounceSearch = debounce(300, this.props.getBeers);
  }

  handleSerach = event => {
    this.setState({searchTerm: event.target.value}, () => {
      this.debounceSearch(this.state.searchTerm, 1);
    });
  }

  loadItems = page => {
    this.props.getBeers(this.state.searchTerm, page);
  }

  handleFavouriteClick = item => {
    if(this.isMarkedAsFavourite(item)) {
      this.props.removeFavourite(item);
    } else {
      this.props.addFavourite(item);
    }
  }

  isMarkedAsFavourite = item => {
    return this.props.favourites.some(favouriteItem => favouriteItem.id === item.id);
  }

  itemSelected = item => {
    this.setState({showModal: true, selectedBeer: item});
  }

  render() {
    const items = [];
    this.props.beers.map((item, idx) => {
      items.push(
        <BeerItem key={item.id}
                  item={item}
                  itemSelected={() => this.itemSelected(item)}
                  isFavourite={this.isMarkedAsFavourite(item)}
                  handleFavouriteClick={() => this.handleFavouriteClick(item)}>
        </BeerItem>
      );
    });

     const loader = (<Loader></Loader>);   

    return (
      <div className="home">
        <section className="home__title">
          <h1>The Beer Bank</h1>
          <span>Find your favourite beer here</span>
          <input type="text" placeholder="Search for beer name" onChange={this.handleSerach}></input>
          <Link to='search'>Advanced Search</Link>
        </section>
        <section className="home__content">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems}
            hasMore={this.props.hasMore}
            loader={loader}>
            <div className="beer-list">
                {items}
            </div>
          </InfiniteScroll>
        </section>
        <Modal show={this.state.showModal} handleClose={() => this.setState({showModal: false})}>
          <BeerDetails beer={this.state.selectedBeer}></BeerDetails>
        </Modal>
      </div>
      
    ); 
  }
}

const mapStateToProps = state => ({
  beers: state.beerBank.beers,
  hasMore: state.beerBank.hasMore,
  favourites: state.beerBank.favourites
})

const mapDispatchToProps = dispatch => ({
  getBeers: (name, page) => dispatch(getBeers({name, page})),
  addFavourite: (item) => dispatch(addFavourite(item)),
  removeFavourite: (item) => dispatch(removeFavourite(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)