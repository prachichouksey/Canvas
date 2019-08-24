import { combineReducers } from "redux";
import HoverBarReducer from "./HoverBarReducer";
import AuthReducer from "./authReducer";
import ErrorReducer from "./errorReducer";
import ProfileReducer from "./profileReducer";
import InboxReducer from "./inboxReducer";
const rootReducer = combineReducers({
  hoverbar: HoverBarReducer,
  auth: AuthReducer,
  errors: ErrorReducer,
  account: ProfileReducer,
  inbox: InboxReducer
});

export default rootReducer;
