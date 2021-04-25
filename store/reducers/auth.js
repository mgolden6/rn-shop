import {
  AUTHENTICATE,
  LOGOUT,
  SIGNIN,
  SIGNUP,
  TRIED_AUTO_LOGIN,
} from "../actions/auth";

const initialState = {
  email: null,
  localId: null,
  idToken: null,
  refreshToken: null,
  expirationDate: null,
  triedAutoLogin: false,
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
        triedAutoLogin: true,
      };
    case SIGNIN:
      return {
        email: action.email,
        localId: action.localId,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expirationDate: action.expirationDate,
        triedAutoLogin: true,
      };
    case AUTHENTICATE:
      return {
        email: action.email,
        localId: action.localId,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expirationDate: action.expirationDate,
        triedAutoLogin: true,
      };
    case TRIED_AUTO_LOGIN:
      return {
        ...state,
        triedAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        triedAutoLogin: true,
      };
    default:
      return state;
  }
};
