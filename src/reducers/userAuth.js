import { SET_AUTHED_USER } from "../actions/userAuth";

export default function userAuth(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}
