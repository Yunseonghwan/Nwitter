import React, { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {
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
        ); //email, password로 회원가입
      } else {
        //log in
        data = await authService.signInWithEmailAndPassword(email, password);
      } // 회원가입 후 로그인
      console.log(data);
    } catch (error) {
      setError(error.message);
      alert(error.message); //회원가입 or 아이디 비밀번호 입력할때 오류 메세지
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </div>
  );
};

export default AuthForm;
