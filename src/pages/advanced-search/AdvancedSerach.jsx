import React from 'react';
import {removeFavourite, addFavourite, searchBeers} from '../../actions/beerActions';
import {connect} from 'react-redux';
import { Modal } from '../../components/modal/Modal';
import { BeerDetails } from '../../components/details/BeerDetails';
import { BeerItem } from '../../components/beer-item/BeerItem';
import './advancedSearch.scss'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class AdvancedSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedBeer: {},
      formControls: {
        maxIBU: 0,
        minIBU: 0,
        maxABV: 0,
        minABV: 0,
        maxEBC: 0,
        minEBC: 0,
        brewedBefore: null,
        brewedAfter: null
      }
    }
  }

  componentDidMount() {
    this.props.search(this.state.formControls);
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

  handleSearch = (event) => {
    event.preventDefault();
    this.props.search(this.state.formControls);
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: value
      }
    });
  }

  handleDateChange = (name, date) => {
    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: date
      }
    });
  }

  render() {
    const {beers} = this.props;
    return (
      <div>
        <div className="search__form">
          <h1>Advanced Search</h1>
          <form onSubmit={this.handleSearch}>
            <label htmlFor='max-ibu'>Max IBU</label>
            <input id='max-ibu' name='maxIBU' type='number' value={this.state.formControls.maxIBU} onChange={this.handleInputChange}/>
              
            <label htmlFor='min-ibu'>Min IBU</label>
            <input id='min-ibu' name='minIBU' type='number' value={this.state.formControls.minIBU} onChange={this.handleInputChange}/>
              
            <label htmlFor='max-abv'>Max ABV</label>
            <input id='max-abv' name='maxABV' type='number' value={this.state.formControls.maxABV} onChange={this.handleInputChange}/>
              
            <label htmlFor='min-abv'>Min ABV</label>
            <input id='min-abv' name='minABV' type='number' value={this.state.formControls.minABV} onChange={this.handleInputChange}/>
              
            <label htmlFor='max-ebc'>Max EBC</label>
            <input id='max-ebc' name='maxEBC' type='number' value={this.state.formControls.maxEBC} onChange={this.handleInputChange}/>
              
            <label htmlFor='min-ebc'>Min EBC</label>
            <input id='min-ebc' name='minEBC' type='number' value={this.state.formControls.minEBC} onChange={this.handleInputChange}/>
              
            <label htmlFor='brewed-before'>Brewed Before</label>
            <DatePicker id='brewed-before' selected={this.state.formControls.brewedBefore} onChange={(date) => this.handleDateChange('brewedBefore', date)}/>
              
            <label htmlFor='brewed-after'>Brewed After</label>
            <DatePicker selected={this.state.formControls.brewedAfter} onChange={(date) => this.handleDateChange('brewedAfter', date)}/>
            
            <input className='button--submit' type="submit" value="Search"/>
          </form>
        </div>
        <div className="search__content">
          <div className="beer-list">
          {beers && beers.map(item => (
              <BeerItem key={item.id}
                        item={item}
                        itemSelected={() => this.itemSelected(item)}
                        isFavourite={this.isMarkedAsFavourite(item)}
                        handleFavouriteClick={() => this.handleFavouriteClick(item)}>
              </BeerItem>
            ))}
          </div>
          <Modal show={this.state.showModal} handleClose={() => this.setState({showModal: false})}>
            <BeerDetails beer={this.state.selectedBeer}></BeerDetails>
          </Modal>
        </div>
      </div>
    ); 
  }
}

const mapStateToProps = state => ({
  favourites: state.beerBank.favourites,
  beers: state.beerBank.advancedSearchResults
})

const mapDispatchToProps = dispatch => ({
  removeFavourite: (item) => dispatch(removeFavourite(item)),
  addFavourite: (item) => dispatch(addFavourite(item)),
  search: (searchData) => dispatch(searchBeers(searchData))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)