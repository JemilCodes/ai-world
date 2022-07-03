import React from "react";
import "../form.css";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Notification from "../notification/Notification";
import ai from "../../images/ai.png";

export default function Register(props) {
  const [inputEmail, setInputEmail] = React.useState("");
  const [inputName, setInputName] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [inputPassword2, setInputPassword2] = React.useState("");
  const [showServerError, setShowServerError] = React.useState(false);
  const [showUserAlreadyExist, setShowUserAlreadyExist] = React.useState(false);
  const [wrongDetails, setWrongDetails] = React.useState(false);
  const [notMatch, setNotMatch] = React.useState(false);
  const [processing, setprocessing] = React.useState(false);

  const inputEmailChange = (event) => {
    setInputEmail(event.target.value);
  };
  const inputPasswordChange = (event) => {
    setInputPassword(event.target.value);
  };
  const inputPasswordChange2 = (event) => {
    setInputPassword2(event.target.value);
  };
  const inputNameChange = (event) => {
    setInputName(event.target.value);
  };
  const onRegister = () => {
    if (inputPassword === inputPassword2) {
      if (
        inputEmail.length > 0 &&
        inputPassword.length > 0 &&
        inputName.length > 0 &&
        inputEmail.includes("@") &&
        inputEmail.includes(".com")
      ) {
        setprocessing(true);
        fetch("https://aiworldbyjemil.herokuapp.com/register", {
          method: "post",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            email: inputEmail,
            password: inputPassword,
            name: inputName,
            faceEntries: 0,
            foodEntries: 0,
            colorEntries: 0,
            apparelEntries: 0,
            generalEntries: 0,
            joined: new Date(),
          }),
        })
          .then((response) => response.json())
          .then((user) => {
            setprocessing(false);
            if (user !== "userAlreadyExist") {
              props.registerUser(user);
              props.routeToggler("home");
            }
            if (user === "userAlreadyExist") {
              setprocessing(false);
              setShowUserAlreadyExist(true);
            }
          })
          .catch((err) => {
            setprocessing(false);
            setShowServerError(true);
          });
      } else {
        setWrongDetails(true);
      }
    } else {
      setNotMatch(true);
    }
  };
  setTimeout(() => {
    if (showServerError) {
      setShowServerError(false);
    }
    if (showUserAlreadyExist) {
      setShowUserAlreadyExist(false);
    }
    if (wrongDetails) {
      setWrongDetails(false);
    }
    if (notMatch) {
      setNotMatch(false);
    }
  }, 5000);
  return (
    <>
      <Notification
        showServerError={showServerError}
        showUserAlreadyExist={showUserAlreadyExist}
        wrongDetails={wrongDetails}
        notMatch={notMatch}
      />
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <img src={ai} alt="ai" className="ai" />
          </div>
          <div className="row clearfix">
            <div>
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
                    placeholder="Comfirm Password"
                    required
                    onChange={inputPasswordChange2}
                    value={inputPassword2}
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <div className="input-icon">
                      <FaUser />
                    </div>
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    onChange={inputNameChange}
                    value={inputName}
                  />
                </div>
                {!processing && (
                  <input
                    className="button bot"
                    type="submit"
                    value="Register"
                    onClick={onRegister}
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
