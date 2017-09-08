import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { LEFTBAR_STATE } from './../../reducers/constants/leftBar';
import { SEARCH_DATA } from './../../reducers/constants/search';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Search from './../../components/search/Search';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpened : false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onHideSearchInput = this.onHideSearchInput.bind(this);
    }

    onChangeLeftBar() {
        const {onClickHeaderRightIconMenu, leftBar} = this.props;

        onClickHeaderRightIconMenu(!leftBar.visible);
    }

    onHideSearchInput(e) {
        if(e.target.id !== 'search') {
            document.body.removeEventListener('click', this.onHideSearchInput);
            this.setState({searchOpened: false});

        }
    }

    onFocus() {
        this.setState({searchOpened: true});
        document.body.addEventListener('click', this.onHideSearchInput);
    }

    render() {

        const rightButtons = (
            <div style={{display: "flex" }}>
                {
                    <Search/>
                }
            </div>
        );


        return (
            <Paper>
                <AppBar
                    title="Dev Library"
                    iconElementRight={rightButtons}
                    onLeftIconButtonTouchTap={() => this.onChangeLeftBar()}
                />
            </Paper>
        )

    }
}

function mapStateToProps(state) {
    const { leftBar} = state;
    return {
        leftBar,
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({
        onClickHeaderRightIconMenu (RightIconMenuEventClick) {
            const payload = {
                leftBar : {
                    visible : RightIconMenuEventClick
                }
            };

            dispatch({ type: LEFTBAR_STATE , payload})
        },

        onChangeSearchInput(handleSearchInput) {
            const payload = {
                handleSearchInput
            };

            dispatch({ type: SEARCH_DATA , payload})
        }
    })
)(withRouter(Header));