import { OPEN_USER_INBOX } from "../actions/actions";

const initialState = {
  inbox: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_USER_INBOX:
      return { ...state, inbox: null };
    default:
      return state;
  }
}
