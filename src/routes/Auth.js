import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    let data;
    try {
      if (newAccount) {
        //create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );  //email, password로 회원가입
      } else {
        //log in
        data = await authService.signInWithEmailAndPassword(email, password);
      } // 회원가입 후 로그인
      console.log(data);
    } catch (error) {
      setError(error.message);
      alert(error.message)  //회원가입 or 아이디 비밀번호 입력할때 오류 메세지
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async(e) => {
    const {target:{name}} = e;
    let provider;
    if(name === "google"){
        provider = new firebaseInstance.auth.GoogleAuthProvider();  //google
    }else if (name === "github"){
        provider = new firebaseInstance.auth.GithubAuthProvider();  //github
    }
    const data = await authService.signInWithPopup(provider)  //google, github 로그인provider
    console.log(data)
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Login" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};
export default Auth;
