import { connect } from "react-redux";
import NotIsLoggedInRoute from "../../hoc/NotIsLoggedInRoute";

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;

    return { isLoggedIn };
}

export default connect(mapStateToProps)(NotIsLoggedInRoute);