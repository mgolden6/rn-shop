import { AUTHENTICATE, SIGNIN, SIGNUP } from "../actions/auth";

const initialState = {
  email: null,
  localId: null,
  idToken: null,
  refreshToken: null,
  expirationDate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        email: action.email,
        localId: action.localId,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expirationDate: action.expirationDate,
      };
    case SIGNIN:
      return {
        email: action.email,
        localId: action.localId,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expirationDate: action.expirationDate,
      };
    case AUTHENTICATE:
      return {
        email: action.email,
        localId: action.localId,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expirationDate: action.expirationDate,
      };
    default:
      return state;
  }
};
