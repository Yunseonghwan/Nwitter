import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider(); //google
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider(); //github
    }
    const data = await authService.signInWithPopup(provider); //google, github 로그인provider
    console.log(data);
  };
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle}/>
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Continue with GitHub <FontAwesomeIcon icon={faGithub}/>
        </button>
      </div>
    </div>
  );
};
export default Auth;
