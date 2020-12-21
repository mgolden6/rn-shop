import ENV from "../../env";

export const SIGNUP = "SIGNUP";

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
