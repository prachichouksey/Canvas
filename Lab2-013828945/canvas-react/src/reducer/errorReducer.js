import { GET_ERRORS, CREATE_USER } from "../actions/actions";

const initialState = {
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, user: action.payload };
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
