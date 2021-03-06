import Home from './pages/home/Home';
import {App} from './App';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './reduxInit';
import Favourites from './pages/favourites/Favourites';
import AdvancedSerach from './pages/advanced-search/AdvancedSerach';

export class Routes extends React.Component {

  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <App>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/favourite' component={Favourites}></Route>
                <Route exact path='/search' component={AdvancedSerach}></Route>
              </Switch>
            </App>
          </BrowserRouter>
        </Provider>
    );
  }
}