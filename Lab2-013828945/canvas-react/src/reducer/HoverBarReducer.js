import {
  OPEN_ACCOUNT_HOVER,
  OPEN_COURSE_HOVER,
  CLOSE_ACCOUNT_HOVER,
  CLOSE_COURSE_HOVER
} from "../actions/actions";
const initialState = { accountHover: false, courseHover: false };
export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_ACCOUNT_HOVER:
      return { accountHover: true, courseHover: false };
    case OPEN_COURSE_HOVER:
      return { accountHover: false, courseHover: true };
    case CLOSE_ACCOUNT_HOVER:
      return initialState;
    case CLOSE_COURSE_HOVER:
      return initialState;
    default:
      return state;
  }
}
