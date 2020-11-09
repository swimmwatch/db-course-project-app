import { connect } from "react-redux";
import PrivateRoute from "../../hoc/PrivateRoute";

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;

    return { isLoggedIn };
}

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export { connectedPrivateRoute as PrivateRoute };