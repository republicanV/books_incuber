import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {formatDate} from './../utils/date-convert';
import Error from './../components/error/Error';

class BookListView extends Component {

    render() {
        let { history, data, data_loaded } = this.props;
        let books = [];

        if((!!data && data.length > 0 && data_loaded === true) || ( this.props.hasOwnProperty('book') && this.props.book !== void 0)) {
            books = this.props.book !== void 0 ? this.props.book : data.map((book, index) => {

                return (
                    
                        <li className="card" key={index} onClick={
                            ()=> {
                                history.push(`/books/view/${book.id}`)
                            }}>
                            <Paper>
                                <a className="card__link">
                                    <div className="card__img-wrap overlay">
                                        <img className="card__img" src={ `/${process.env.PUBLIC_URL}images/${book.img}` } alt=""/>
                                        <div className="card__img-mask waves-effect waves-light"></div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__title">{book.title}</div>
                                        <div className="card__author">{book.author}</div>
                                        <div className="card__date">{formatDate(book.timestamp)}</div>
                                        <div className="card__edit">
                                            <RaisedButton label="Edit" secondary={true} key={book.id} onClick={
                                                (e) => {
                                                    e.stopPropagation();
                                                    history.push(`/books/edit/${book.id}`)
                                            }}/>
                                        </div>
                                    </div>
                                </a>
                            </Paper>
                        </li>
                    
                )
            });
        } else if(!!data && data.length === 0 && data_loaded === false ) {
            books = <CircularProgress />;

        } else {
            books = <Error errorText="Books not found"/>;
        }

        return (
            <div className="main-container container-fluid">
                <ul className="row-wrap between-xs">
                    { books }
                </ul>
            </div>
            )
    }
}

const filter = (o, f) => {
    return !!f ? o.filter(fo => {
        return fo.title.toLowerCase().indexOf(f.toLowerCase()) > -1;
    }) : o;
};

const mapStateToProps = state => {
    return {
        data: filter(state.books.books, state.search.filter),
        data_loaded : state.books.loaded
    }
};

export default connect(
    mapStateToProps
)(withRouter(BookListView));