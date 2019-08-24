import { CREATE_USER, SET_CURRENT_USER, REMOVE_USER } from "../actions/actions";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, user: action.payload };
    case SET_CURRENT_USER:
      return { ...state, user: action.payload, isAuthenticated: true };
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}
