import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import BooksListView from './../../views/BooksListView';
import {SET_BOOKS_DATA_IN_PROGRESS, SET_BOOKS_DATA_SUCCESS} from './../../reducers/constants/books';
import axios from 'axios';

class IndexRoute extends Component {

    getBooks() {
        const self = this;

        return axios.get('/books.json').then(
            (response) => {
                self.props.onSetBooksData(response.data.books)
            });
    }

    componentWillMount() {
        const self = this;

        if (
            self.props.hasOwnProperty('data') &&
            self.props.data.hasOwnProperty('books')
            && !!!self.props.data.books.length
        ) {

            setTimeout(this.getBooks.bind(self), 2000);


        }

    }

    render() {
        return (
            <div className="content-wrapper">
                <BooksListView/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.books
    }
};

const mapDispatchToProps = dispatch => ({
    onSetBooksData(books) {
        const payload = {
            books,
            loaded: true
        };

        dispatch({type: SET_BOOKS_DATA_SUCCESS, payload})
    },
    onSetBooksDataLoaded(loaded) {
        const payload = {
            loaded
        };

        dispatch({type: SET_BOOKS_DATA_IN_PROGRESS, payload})
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(IndexRoute));