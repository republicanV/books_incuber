import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {formatDate} from './../utils/date-convert';

class BookListView extends Component {

    render() {
        let {history} = this.props;
        const book = this.props.book;

        if (this.props.hasOwnProperty('book') && this.props.book !== void 0) {

            return (

                <li className="card" key={book.id} onClick={
                    () => {
                        history.push(`/books/view/${book.id}`)
                    }}>
                    <Paper>
                        <a className="card__link">
                            <div className="card__img-wrap overlay">
                                <img className="card__img" src={`/${process.env.PUBLIC_URL}images/${book.img}`} alt=""/>
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
        } else return <Redirect to='/'/>
    }
}

export default withRouter(BookListView);