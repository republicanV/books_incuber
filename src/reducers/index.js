import { combineReducers } from 'redux';

import leftBar from './leftBar';
import books from './books';
import search from './search';

export default combineReducers({
    leftBar,
    books,
    search
});
