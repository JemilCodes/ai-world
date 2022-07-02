import React from "react";
import "./notification.css";

export default function Notification({
  showUserAlreadyExist,
  showServerError,
  showLoginSuccess,
  showLoginFailed,
  showRegisterSuccess,
  showConnectionError,
  showApiError,
  wrongDetails,
  notMatch,
  webCamError,
}) {
  return (
    <div className="center">
      {showServerError && (
        <div className="notification">
          <p>Server not responding,try again later</p>
        </div>
      )}
      {showLoginFailed && (
        <div className="notification">
          <p>User does not exist,cross check your login credentials</p>
        </div>
      )}
      {showLoginSuccess && (
        <div className="success">
          <p>Login Successful</p>
        </div>
      )}
      {showRegisterSuccess && (
        <div className="success">
          <p>Registration Successful</p>
        </div>
      )}
      {showConnectionError && (
        <div className="notification">
          <p>Check your Internet Connection</p>
        </div>
      )}
      {showUserAlreadyExist && (
        <div className="notification">
          <p>User Already Exist, Sign In Instead</p>
        </div>
      )}
      {showApiError && (
        <div className="notification">
          <p>Check Url, Make Sure Url Starts With https</p>
        </div>
      )}
      {wrongDetails && (
        <div className="notification">
          <p>Invalid Input Feild</p>
        </div>
      )}
      {notMatch && (
        <div className="notification">
          <p>Password do not match</p>
        </div>
      )}
      {webCamError && (
        <div className="notification">
          <p>
            Your webcam is not responding,pls reload this page and try again
          </p>
        </div>
      )}
    </div>
  );
}
