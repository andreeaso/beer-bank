import React from 'react';
import './beerDetails.scss'

export class BeerDetails extends React.Component {

  render() {
    const {beer} = this.props;
    return (
      <div>
        <div className="details">
          <div className="details__image"><img src={beer.image_url} alt={beer.name}></img></div>
          <div className="details__items">
            <h3 className="details__name">{beer.name}</h3>
            <span className="details__tagline">{beer.tagline}</span>
            <span className="details__separator"></span>
            <div className="details__parameters">
              <span><strong>IBU:</strong>{beer.ibu}</span>
              <span><strong>ABV:</strong>{beer.abv}</span>
              <span><strong>EBC:</strong>{beer.ebc}</span>
            </div>
            <div className="details__description">{beer.description}</div>
            <div>
              <span><strong>Best served with:</strong></span>
              <ul>
                {beer.food_pairing && beer.food_pairing.map(pairing => (<li key={pairing}>{pairing}</li>))}
              </ul>
            </div>
          </div>
        </div>
        <div className="similar"></div>
      </div>
    );
  }
}