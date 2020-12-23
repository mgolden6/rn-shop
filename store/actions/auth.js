import ENV from "../../env";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const signupResponse = await fetch(
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
      const signupResponseData = await signupResponse.json();
      console.log(signupResponseData);
      dispatch({ type: SIGNUP });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with Signup!");
    }
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    try {
      const signinResponse = await fetch(
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
      const signinResponseData = await signinResponse.json();
      console.log(signinResponseData);
      dispatch({ type: SIGNIN });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong with Signin!");
    }
  };
};
