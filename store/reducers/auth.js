import { SIGNIN, SIGNUP } from "../actions/auth";

const initialState = {
  email: null,
  localId: null,
  idToken: null,
  refreshToken: null,
  expiresIn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        email: action.email,
        localId: action.localId,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expiresIn: action.expiresIn,
      };
    case SIGNIN:
      return {
        email: action.email,
        localId: action.localId,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expiresIn: action.expiresIn,
      };
    default:
      return state;
  }
};
