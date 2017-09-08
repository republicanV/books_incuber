import React, { PureComponent } from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

class Error extends PureComponent {

    render() {
        return (
            <Paper>
                <div>
                    {this.props.errorText}
                </div>
            </Paper>
        );
    }
}

Error.propTypes = {
    errorText: PropTypes.string
};

export default Error;
