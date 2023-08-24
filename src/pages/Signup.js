import "../styles/Sign.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

import signup from "../libs/signup";

function Signup() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleImageChange = (event) => {
    setImageValue(event.target.value);
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const res = await signup(nameValue, emailValue, passwordValue, imageValue);

    if (res.message) {
      setErrorMessage(res.message);
      setIsLoading(false);
      return;
    }

    signIn({
      token: res.user.token,
      expiresIn: 3600,
      tokenType: "Bearer",
      authState: { creatorId: res.user.result.id_creator },
    });

    navigate(`/videos`);
  };

  return (
    <div className="Sign-UpperContainer">
      <div className="Sign-container">
        <form onSubmit={handleSignupSubmit} className="Sign-Form">
          <input
            value={nameValue}
            onChange={handleNameChange}
            placeholder="Name"
            className="Sign-Input"
          />
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
          <input
            value={imageValue}
            onChange={handleImageChange}
            placeholder="Image URL"
            className="Sign-Input"
          />
          {errorMessage !== "" ? (
            <label className="Sign-Label">{errorMessage}</label>
          ) : (
            ""
          )}
          <button type="submit" className="Sign-SubmitButton">
            {isLoading ? <div className="loader"></div> : "Sign up"}
          </button>
        </form>
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className="Sign-Button"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}

export default Signup;
