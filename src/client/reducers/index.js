import { combineReducers } from "redux";

import auth from "./auth";
import testEditor from "./testEditor";
import testPassing from "./testPassing";

export default combineReducers({ auth, testEditor, testPassing });