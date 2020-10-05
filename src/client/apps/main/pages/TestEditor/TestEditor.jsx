import * as React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { connect } from "react-redux";

class TestEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h2>hello</h2>
        );
    }
}

TestEditor.propsType = {
    dispatch: PropTypes.func,
    history: ReactRouterPropTypes.history
};

const connectedTestEditor = connect()(TestEditor);

export { connectedTestEditor as TestEditor };