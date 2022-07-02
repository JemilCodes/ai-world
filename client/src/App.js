import React from "react";
import "./app.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesOptions } from "./component/particlesOPtions";
import { FaTimes } from "react-icons/fa";


import Nav from "./component/nav/Nav";
import SignIn from "./component/signin/SignIn";
import Register from "./component/register/Register";
import Home from "./component/home/Home";
import FaceRecognitionModel from "./component/faceRecognitionModel/FaceRecognitionModel.js";
import ColorModel from "./component/colorModel/ColorModel";
import FoodModel from "./component/foodModel/FoodModel";
import Apparel from "./component/apparelModel/Apparel";
import GeneralModel from "./component/generalModel/GeneralModel";
import RealTime from "./RealTimeFaceRecognition";
import Notice from "./component/notice/Notice";

export default function App() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const [boundingBox, setBoundingBox] = React.useState([]);
  const [apparel, setApparel] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [food, setFood] = React.useState([]);
  const [general, setGeneral] = React.useState([]);

  const [showRegisterSuccess, setShowRegisterSuccess] = React.useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = React.useState(false);
  const [show , setShow] = React.useState(true);

  const [deleting, setDeleting] = React.useState(false);

  const [route, setRoute] = React.useState("register");
  const [user, setUser] = React.useState({
    name: "",
    id: "",
    email: "",
    faceEntries: 0,
    foodEntries: 0,
    colorEntries: 0,
    apparelEntries: 0,
    generalEntries: 0,
    joined: "",
  });
  const registerUser = (userdata) => {
        setUser({
      name: userdata.name,
      id: userdata._id,
      email: userdata.email,
      password: userdata.password,
      faceEntries: 0,
      foodEntries: 0,
      colorEntries: 0,
      apparelEntries: 0,
      generalEntries: 0,
      joined: userdata.joined,
    });
    setShowRegisterSuccess(true)
  };
  const userLogin = (userdata) => {
    setUser({
      name: userdata[0].name,
      id: userdata[0]._id,
      email: userdata[0].email,
      password: userdata[0].password,
      faceEntries: userdata[0].faceEntries,
      foodEntries: userdata[0].foodEntries,
      colorEntries: userdata[0].colorEntries,
      apparelEntries: userdata[0].apparelEntries,
      generalEntries: userdata[0].generalEntries,
      joined: userdata[0].joined,
    });
    setShowLoginSuccess(true)
  };

  const routeToggler = (route) => {
    if (route === "register") {
      setShow(true)
      setInputState("")
      setShowNotice(false)
      setRoute("register");
      setShowBar(true);
      setShowTimes(false);
      setShowUser(false)
    } else if (route === "signin") {
      setShow(true)
      setShowNotice(false)
      setRoute("signin");
      setShowBar(true);
      setShowTimes(false);
    } else if (route === "home") {
      setShow(true)
      setInputState("")
      setRoute("home");
      setShowNotice(false)
      setShowBar(true);
      setShowTimes(false);
    } 
    else if (route === "facemodel") {
      setShow(true)
      setRoute("facemodel");
      setTimeout(()=>{
        if (!showNotice){
          setShowNotice(true)
        }
      },2000)
    } else if (route === "colormodel") {
      setShow(true)
      setRoute("colormodel");
      setTimeout(()=>{
        if (!showNotice){
          setShowNotice(true)
        }
      },2000)
    } else if (route === "foodmodel") {
      setShow(true)
      setRoute("foodmodel");
      setTimeout(()=>{
        if (!showNotice){
          setShowNotice(true)
        }
      },2000)
    } else if (route === "apparelmodel") {
      setShow(true)
      setRoute("apparelmodel");
      setTimeout(()=>{
        if (!showNotice){
          setShowNotice(true)
        }
      },2000)
    } else if (route === "generalmodel") {
      setShow(true)
      setRoute("generalmodel");
      setTimeout(()=>{
        if (!showNotice){
          setShowNotice(true)
        }
      },2000)
    } else if (route === "realtime") {
      setShow(false)
      setRoute("realtime");
    }
  };
  const [showBar , setShowBar] = React.useState(true)
  const handleBar = () => {
    setShowBar(false)
    setShowTimes(true)
  }
  const [showTimes , setShowTimes] = React.useState(false)
  const handleTimes = () => {
    setShowTimes(false)
    setShowBar(true)
  }

  const [showUser , setShowUser] = React.useState(false)
  const userProfileToggler = () => {
    setShowBar(true)
    setShowUser(true)
  }
  const [inputState, setInputState] = React.useState("");

  const onInputChange = (event) => {
    setBoundingBox([])
    setApparel([])
    setColors([])
    setFood([])
    setGeneral([])
    setInputState(event.target.value);
  };
  const closeProfile = () => {
    setShowUser(false
      )
  }
 
  const [showNotice , setShowNotice] = React.useState(false)

  setTimeout(()=>{
    if (showNotice){
      setShowNotice(false)
    }
  },15000)
  setTimeout(() => {
    if (showRegisterSuccess) {
      setShowRegisterSuccess(false);
    }
    if (showLoginSuccess) {
      setShowLoginSuccess(false);
    }
  }, 5000);
  const [deleted , setDeleted] = React.useState(false)
  const [deletedError , setDeletedError] = React.useState(false)
  const handleDelete = () => {
    setDeleting(true)
    fetch("http://localhost:3001/delete", {
      method: "delete",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        id:user.id
      }),
    }).then(response => response.json()).then(isDeleted => {
      setDeleting(false)
      if (isDeleted==="yes") {
        setDeleted(true)
        setTimeout(()=>{
          setDeleted(false)
          setShowUser(false)
          setRoute("register")
        },1000)
      }
    }).catch(()=>{
      setDeleting(false)
      setDeletedError(true)
      setTimeout(()=>{
        setDeletedError(false)
        },1000)
    })
  }
  return (
    <div className="App">
      { show && <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="particles"
      /> }
      <Nav 
        routeToggler={routeToggler} 
        route={route} 
        showUser={showUser} 
        userProfileToggler={userProfileToggler} 
        showBar={showBar} 
        handleBar={handleBar} 
        showTimes={showTimes} 
        handleTimes={handleTimes} 
      />
        <Notice showNotice={showNotice} />
        <div className={ showUser&& showBar ? "show" : "hidden" }>
        <FaTimes
            size="1.8em"
            className={showUser ? "close" : "open"}
            onClick={closeProfile}
          />
          <div className="user-profile">
            {deleted && <div style={{color:"red"}}>Account Deleted !!</div>}
            {deletedError && <div style={{color:"red"}}>Something went wrong,try again later!!</div>}
            <div>Hi, {user.name}!!!</div>
            <div>Your Email:{user.email}</div>
            <div>You Joined:{user.joined}</div>
            <div>Total Entries:{user.apparelEntries+user.colorEntries+user.faceEntries+user.foodEntries+user.generalEntries}</div>
            {!deleting && <div><button className="bot del2" onClick={handleDelete}>Delete Account</button></div>}
            {deleting && <div className="processing del">
              <div>Deleting</div>
              <div className="one div"></div>
              <div className="two div"></div>
              <div className="three div"></div>
              <div className="four div"></div>
              </div>}
          </div>
        </div>
      {route === "signin" && (
       <SignIn routeToggler={routeToggler} userLogin={userLogin} /> 
      )}
      {route === "register" && (
       <Register routeToggler={routeToggler} registerUser={registerUser} setUser={setUser} />
      )}
      {route === "home" && (
       <Home routeToggler={routeToggler} showRegisterSuccess={showRegisterSuccess} showLoginSuccess={showLoginSuccess}/>
      )}

      {route === "facemodel" && (
         <FaceRecognitionModel
          inputState={inputState}
          onInputChange={onInputChange}
          userdata={user}
          route={route}
          setUser={setUser}
          boundingBox={boundingBox}
          setBoundingBox={setBoundingBox}
        />
      )}

      {route === "colormodel" && (
        <ColorModel
          inputState={inputState}
          onInputChange={onInputChange}
          route={route}
          userdata={user}
          setUser={setUser}
          colors={colors}
          setColors={setColors}
        />
      )}

      {route === "foodmodel" && (
        <FoodModel
          inputState={inputState}
          onInputChange={onInputChange}
          route={route}
          userdata={user}
          setUser={setUser}
          food={food}
          setFood={setFood}
        />
      )}

      {route === "apparelmodel" && (
        <Apparel
          inputState={inputState}
          onInputChange={onInputChange}
          route={route}
          userdata={user}
          setUser={setUser}
          apparel={apparel}
          setApparel={setApparel}
        />
      )}

      {route === "generalmodel" && (
        <GeneralModel
          inputState={inputState}
          onInputChange={onInputChange}
          route={route}
          userdata={user}
          setUser={setUser}
          general={general}
          setGeneral={setGeneral}
        />
      )}
      {route === "realtime" && 
      <RealTime
      routeToggler={routeToggler}
      />
     }
    </div>
  );
}
