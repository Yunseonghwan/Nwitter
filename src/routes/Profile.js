import React from 'react'
import { useHistory } from 'react-router-dom';
import { authService } from "../fbase";

const EditProfile = () => {
    const history = useHistory();  //logout 후 이동
  const onLogOutClick = () => {  //logout event
     
    authService.signOut(); 
    history.push("/")
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default EditProfile;
