import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Header from "../../../apps/contest/components/Header";

function mapStateToProps(state) {
    const { isLoggedIn, user } = state.auth;

    return { isLoggedIn, user };
}

const headerWithRouter = withRouter(Header);
const connectedHeaderWithRouter = connect(mapStateToProps)(headerWithRouter);

export { connectedHeaderWithRouter as Header };