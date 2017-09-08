import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router';
import BookListView from './../../views/BookListView';

class bookViewRoute extends PureComponent {
    render() {
        const {data, match} = this.props;
        const book = data.books.filter((book) => parseInt(book.id) === parseInt(match.params.id))[0];

        return (
            data.books.length > 0 ?
                <div className="content-wrapper">
                    <div className="main-container container-fluid">
                        <ul className="row-wrap between-xs">
                            <BookListView book={book}/>
                        </ul>
                    </div>
                </div>
                : <Redirect to="/"/>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.books
    }
};

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(bookViewRoute));