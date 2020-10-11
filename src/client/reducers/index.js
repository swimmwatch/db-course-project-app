import { combineReducers } from "redux";

import auth from "./auth";
import testEditor from "./testEditor";

export default combineReducers({ auth, testEditor });