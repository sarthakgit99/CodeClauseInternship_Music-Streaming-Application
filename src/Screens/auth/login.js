import React from "react";
import { loginEndpoint } from "../../Spotify";
import "./login.css";
const Login = () => {
  return (
    <div className="login-page">
      <img
        src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2pvYjc4MC1lbGVtZW50LTA4Ni1sMm9jZGxqeS5qcGc.jpg"
        alt="spotify-logo"
        className="logo"
      ></img>
      <h1>Sarthak Musicals 🎷</h1>
      <a href={loginEndpoint}>
        <div className="login-btn">LOG IN</div>
      </a>
    </div>
  );
};
export default Login;
