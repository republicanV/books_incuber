import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router';
import BookListView from './../../views/BookListView';
import {CHANGE_BOOK, DELETE_BOOK} from './../../reducers/constants/books';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { capitalizeFirstLetter } from './../../utils/string-converter';

class bookEditRoute extends Component {

    onDeleteBook(book) {
        const { data, history} = this.props;
        const books = data.books.filter((b) => b.id !== book.id);
        this.props.onDeleteBook(books);
        history.push('/');
    }

    onChangeTextField(books, book) {
        books[book.id - 1] = book;

        this.props.onChangeBook(books);
        this.forceUpdate();
    }

    render() {

        const {data, match} = this.props;
        const book = data.books.filter((book) => parseInt(book.id) === parseInt(match.params.id))[0];

        return (
            data.books.length > 0 ?
                <div className="content-wrapper">
                    <div className="main-container container-fluid">
                        <ul className="row-wrap between-xs">
                            <BookListView book={book}/>
                            <li className="card-book__edit">
                                <div>
                                    <DatePicker
                                        id="date"
                                        floatingLabelText="Date"
                                        hintText="Date"
                                        defaultDate={ new Date(book.timestamp * 1000)}
                                        onChange={
                                            (e, date) => {
                                                this.onChangeTextField(this.props.data.books, {
                                                    ...book,
                                                    timestamp: date * 1 / 1000
                                                });
                                            }
                                        }
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="title"
                                        floatingLabelText="Title"
                                        floatingLabelFixed={true}
                                        defaultValue={ book.title }
                                        onChange={
                                            (e) => {
                                                this.onChangeTextField(this.props.data.books, {
                                                    ...book,
                                                    title: capitalizeFirstLetter(e.target.value)
                                                });
                                            }
                                        }
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="author"
                                        floatingLabelText="Author"
                                        floatingLabelFixed={true}
                                        defaultValue={ book.author }
                                        onChange={
                                            (e) => {
                                                this.onChangeTextField(this.props.data.books, {
                                                    ...book,
                                                    author: capitalizeFirstLetter(e.target.value)
                                                });
                                            }
                                        }
                                    />
                                </div>

                                <RaisedButton
                                    label="Delete"
                                    secondary={true}
                                    style = {{marginTop: 20}}
                                    buttonStyle = {{backgroundColor : "red"}}
                                    onTouchTap={() => this.onDeleteBook(book)}
                                />

                            </li>
                        </ul>
                    </div>
                </div>
                : <Redirect to="/"/>
        )
    }
}

const mapStateToProps = state => {
    return {
        data : state.books
    }
};

const mapDispatchToProps = dispatch => ({
    onDeleteBook(books) {
        const payload = {
            books
        };

        dispatch({type: DELETE_BOOK, payload});
    },
    onChangeBook(books) {
        const payload = {
            books
        };

        dispatch({type: CHANGE_BOOK, payload});
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(bookEditRoute));