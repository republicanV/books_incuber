import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import indexRoute from './components/routes/IndexRoute';
import BookViewRoute from './components/routes/BookViewRoute';
import BookEditRoute from './components/routes/BookEditRoute';
import MainLayout from './containers/MainLayout';

import logger from 'redux-logger';
import './App.css';

injectTapEventPlugin();

class App extends Component {
  render() {

      const store = createStore(
          reducers,
          composeWithDevTools(applyMiddleware(thunk, logger))
      );

    return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
              <Provider store={ store }>
                  <Router>
                      <Switch>
                          <Route exact path="/" component={MainLayout(indexRoute)}/>
                          <Route path="/books/view/:id" component={MainLayout(BookViewRoute)}/>
                          <Route path="/books/edit/:id" component={MainLayout(BookEditRoute)}/>
                      </Switch>
                  </Router>
              </Provider>
          </MuiThemeProvider>

      );
  }
}

export default App;

