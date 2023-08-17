import "../styles/Sign.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

import signin from "../libs/signin";

function Signin() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleSigninSubmit = async (event) => {
    event.preventDefault();

    const res = await signin(emailValue, passwordValue);

    if (res.message) {
      setErrorMessage(res.message);
      return;
    }

    signIn({
      token: res.user.token,
      expiresIn: 3600,
      tokenType: "Bearer",
      authState: {
        creatorId: res.user.result.id_creator,
      },
    });

    navigate(`/videos`);
  };
  return (
    <div className="Sign-UpperContainer">
      <div className="Sign-container">
        <form
          onSubmit={handleSigninSubmit}
          autoComplete="off"
          className="Sign-Form"
        >
          <input
            value={emailValue}
            onChange={handleEmailChange}
            placeholder="Email"
            className="Sign-Input"
          />
          <input
            value={passwordValue}
            type="password"
            onChange={handlePasswordChange}
            placeholder="Password"
            className="Sign-Input"
          />
          {errorMessage !== "" ? (
            <label className="Sign-Label">{errorMessage}</label>
          ) : (
            ""
          )}
          <button type="submit" className="Sign-SubmitButton">
            Sign in
          </button>
        </form>
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="Sign-Button"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
}

export default Signin;
