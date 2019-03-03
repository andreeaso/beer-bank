import React from 'react';
import './beerItem.scss';

export class BeerItem extends React.Component {

  clickFavourite = (event) => {
    event.stopPropagation();
    this.props.handleFavouriteClick();
  }

  render() {
    const {item, itemSelected, isFavourite} = this.props; 
    return (
      <div key={item.id} className="beer__item" onClick={itemSelected}>
          <img src={item.image_url} alt={item.name}></img>
          <h3 className="beer__name">{item.name}</h3>
          <span className="beer__tagline">{item.tagline}</span>
          <span className={`beer__favourite ${isFavourite ? 'beer__favourite--selected' : '' }`}
           onClick={this.clickFavourite}>
        </span>
        </div>
    );
  }
}