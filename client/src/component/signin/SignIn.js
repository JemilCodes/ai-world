import React from "react";
import "../form.css";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Notification from "../notification/Notification";
import ai from "../../images/ai.png";

export default function SignIn(props) {
  const [inputEmail, setInputEmail] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [showLoginFailed, setShowLoginFailed] = React.useState(false);
  const [showServerError, setShowServerError] = React.useState(false);
  const [wrongDetails, setWrongDetails] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  const inputEmailChange = (event) => {
    setInputEmail(event.target.value);
  };
  const inputPasswordChange = (event) => {
    setInputPassword(event.target.value);
  };
  const onSignin = () => {
    if (inputEmail.length > 0 && inputPassword.length > 0) {
      setProcessing(true);
      fetch("https://aiworldbyjemil.herokuapp.com/login", {
        method: "post",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          setProcessing(false);
          if (user.length > 0) {
            props.userLogin(user);
            props.routeToggler("home");
          }
          if (user === "failedUser") {
            setProcessing(false);
            setShowLoginFailed(true);
          } else {
            setShowServerError(true);
          }
        })
        .catch(() => {
          setProcessing(false);
          setShowServerError(true);
        });
    } else {
      setWrongDetails(true);
    }
  };

  setTimeout(() => {
    if (showLoginFailed) {
      setShowLoginFailed(false);
    }
    if (showServerError) {
      setShowServerError(false);
    }
    if (wrongDetails) {
      setWrongDetails(false);
    }
  }, 5000);

  return (
    <>
      <Notification
        showLoginFailed={showLoginFailed}
        showServerError={showServerError}
        wrongDetails={wrongDetails}
      />
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <img src={ai} alt="ai" className="ai" />
          </div>
          <div className="row clearfix">
            <div className="">
              <div>
                <div className="input_field">
                  {" "}
                  <span>
                    <div className="input-icon">
                      <FaEnvelope />
                    </div>
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={inputEmailChange}
                    value={inputEmail}
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <div className="input-icon">
                      <FaLock />
                    </div>
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={inputPasswordChange}
                    value={inputPassword}
                  />
                </div>
                {!processing && (
                  <input
                    className="button bot"
                    type="submit"
                    value="Sign in now"
                    onClick={onSignin}
                  />
                )}
                {processing && (
                  <div className="processing">
                    <div>Loading</div>
                    <div className="one div"></div>
                    <div className="two div"></div>
                    <div className="three div"></div>
                    <div className="four div"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
