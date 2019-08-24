import {
  GET_USER_PROFILE,
  CLEAR_USER_PROFILE,
  EDIT_USER_PROFILE
} from "../actions/actions";

const initialState = {
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...state, profile: action.payload };
    case CLEAR_USER_PROFILE:
      return { ...state, profile: null };
    case EDIT_USER_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}
