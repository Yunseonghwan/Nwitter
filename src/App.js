import React, { useEffect, useState } from "react";
import AppRouter from "./components/Router";
import { authService } from "./fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null); //user 확인

  useEffect(() => {
    authService.onAuthStateChanged((user) => {   //user state변경값으로 로그인 여부
      if (user) {
        // setIsLoggedIn(true);
        setUserObj(user)
      } else {
        // setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
    {init ?  <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Init....."}
     
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
