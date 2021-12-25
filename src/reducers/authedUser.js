import { SET_AUTHED_USER } from "../actions/authenticaauthedUsertedUser";

export default function authenticatedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}