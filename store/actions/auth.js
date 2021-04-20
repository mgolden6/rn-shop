import ENV from "../../env";
import AsyncStorage from "@react-native-community/async-storage";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let response;
let responseData;
let errorId;
let errorMessage;
let expirationDate;
let logoutTimer;

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      response = await fetch(
        `${ENV.FIREBASE_EMAIL_SIGNUP_URI}${ENV.FIREBASE_WEB_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      responseData = await response.json();

      if (!response.ok) {
        errorId = responseData.error.message;
        throw new Error(errorId);
      }

      const { localId, idToken, refreshToken, expiresIn } = responseData;

      expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn) * 1000
      );

      saveUserAuthData(
        email,
        localId,
        idToken,
        refreshToken,
        expirationDate.toISOString()
      );

      dispatch(setLogoutTimer(expirationDate));
      dispatch({
        type: SIGNUP,
        email,
        localId,
        idToken,
        refreshToken,
        expirationDate: expirationDate.toISOString(),
      });
    } catch (error) {
      errorId = error.message;
      errorMessage = "Something went wrong with Sign Up!";
      if (errorId === "EMAIL_EXISTS") {
        errorMessage = "This email address is in use by another account.";
      } else if (errorId === "OPERATION_NOT_ALLOWED") {
        errorMessage = "Password sign-in is disabled for this project.";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER:") {
        errorMessage =
          "We have blocked all requests from this device due to unusual activity. Try again later.";
      }
      throw new Error(errorMessage);
    }
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    try {
      response = await fetch(
        `${ENV.FIREBASE_EMAIL_SIGNIN_URI}${ENV.FIREBASE_WEB_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      responseData = await response.json();

      if (!response.ok) {
        errorId = responseData.error.message;
        throw new Error(errorId);
      }

      const { localId, idToken, refreshToken, expiresIn } = responseData;

      expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn) * 1000
      );

      saveUserAuthData(
        email,
        localId,
        idToken,
        refreshToken,
        expirationDate.toISOString()
      );

      dispatch(setLogoutTimer(expirationDate));
      dispatch({
        type: SIGNIN,
        email,
        localId,
        idToken,
        refreshToken,
        expirationDate: expirationDate.toISOString(),
      });
    } catch (error) {
      errorId = error.message;
      errorMessage = "Something went wrong with Sign In!";
      if (errorId === "EMAIL_NOT_FOUND") {
        errorMessage = "Email not found. The user may have been deleted.";
      } else if (errorId === "INVALID_PASSWORD") {
        errorMessage =
          "The password is invalid or the user does not have a password.";
      } else if (errorId === "USER_DISABLED") {
        errorMessage =
          "The user account has been disabled by an administrator.";
      }
      throw new Error(errorMessage);
    }
  };
};

export const authenticate = (
  email,
  localId,
  idToken,
  refreshToken,
  expirationDate
) => {
  return async (dispatch) => {
    try {
      dispatch(setLogoutTimer(expirationDate));
      dispatch({
        type: AUTHENTICATE,
        email,
        localId,
        idToken,
        refreshToken,
        expirationDate,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      clearLogoutTimer();
      await AsyncStorage.removeItem("userAuthData");
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.log(error);
    }
  };
};

const saveUserAuthData = async (
  email,
  localId,
  idToken,
  refreshToken,
  expirationDateString
) => {
  try {
    await AsyncStorage.setItem(
      "userAuthData",
      JSON.stringify({
        email,
        localId,
        idToken,
        refreshToken,
        expirationDateString,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const setLogoutTimer = (expirationDate) => {
  return (dispatch) => {
    logoutTimer = setTimeout(() => {
      dispatch(logout());
    }, expirationDate.getTime() - new Date().getTime());
  };
};

const clearLogoutTimer = () => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
};
