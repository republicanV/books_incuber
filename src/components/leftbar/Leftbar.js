import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import HomeIcon from 'material-ui/svg-icons/action/home';
import { LEFTBAR_STATE } from './../../reducers/constants/leftBar';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class Leftbar extends React.Component {

    render() {
        const { history, leftBar, onRequestChangeByDocument } = this.props;
        return (
            <Paper>
                <Drawer  open={ leftBar.visible } docked={ false } onRequestChange={() => onRequestChangeByDocument(!leftBar.visible)}>
                    <MenuItem onClick={() => { onRequestChangeByDocument(false); history.push("/")}} primaryText="Home" leftIcon={<HomeIcon/>} />
                </Drawer>
            </Paper>
        );
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
        onRequestChangeByDocument (RightIconMenuEventClick) {
            const payload = {
                leftBar : {
                    visible : RightIconMenuEventClick
                }
            };

            dispatch({ type: LEFTBAR_STATE , payload})
        }
    })
)(withRouter(Leftbar));
