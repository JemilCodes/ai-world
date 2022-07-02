import React from "react";
import "./home.css";
import Notification from "../notification/Notification";

import { FaAngleRight } from "react-icons/fa";

export default function Home({
  routeToggler,
  showRegisterSuccess,
  showLoginSuccess,
}) {
  return (
    <>
      <Notification
        showRegisterSuccess={showRegisterSuccess}
        showLoginSuccess={showLoginSuccess}
      />
      <div className="model-container">
        <div className="model-wrapper">
          <div className="face model">
            <div className="img bg-face">
            </div>
            <div className="fit-content">
              <h4>Face Detection Model</h4>
              <p>
                Detect if an image contains human faces and coordinate locations
                of where those face appear with a bounding box.
              </p>
              <div className="try-it-out">
                <div className="try-it-out">
                  <p onClick={() => routeToggler("facemodel")} className="move">
                    try it out
                  </p>
                </div>
                <div className="try-it-out">
                  <FaAngleRight className="fa-angle-right" />
                </div>
              </div>
            </div>
          </div>

          <div className="color model">
            <div className="img bg-color" />
            <div className="fit-content">
              <h4>Color Detection Model</h4>
              <p>
                Return density values for dominant colors present in images.
              </p>
              <div className="try-it-out">
                <div className="try-it-out">
                  <p
                    onClick={() => routeToggler("colormodel")}
                    className="move"
                  >
                    try it out
                  </p>
                </div>
                <div className="try-it-out">
                  <FaAngleRight className="fa-angle-right" />
                </div>
              </div>
            </div>
          </div>
          <div className="food model">
            <div className="img bg-food" />
            <div className="fit-content">
              <h4>Food Detection Model</h4>
              <p>
                Recognize more than 1,000 food items and dishes in images down
                to the ingredient level.
              </p>
              <div className="try-it-out">
                <div className="try-it-out">
                  <p onClick={() => routeToggler("foodmodel")} className="move">
                    try it out
                  </p>
                </div>
                <div className="try-it-out">
                  <FaAngleRight className="fa-angle-right" />
                </div>
              </div>
            </div>
          </div>
          <div className="apparel model">
            <div className="img bg-apparel" />
            <div className="fit-content">
              <h4>Apparel Detection Model</h4>
              <p>Detect items of clothings or fashion-related items</p>
              <div className="try-it-out">
                <div className="try-it-out">
                  <p
                    onClick={() => routeToggler("apparelmodel")}
                    className="move"
                  >
                    try it out
                  </p>
                </div>
                <div className="try-it-out">
                  <FaAngleRight className="fa-angle-right" />
                </div>
              </div>
            </div>
          </div>

          <div className="general  model">
            <div className="img bg-general" />
            <div className="fit-content">
              <h4>General Detection Model</h4>
              <p>
                Recognize over 11,000 concepts including objects, themes, mooods
                and more.
              </p>
              <div className="try-it-out">
                <div className="try-it-out">
                  <p
                    onClick={() => routeToggler("generalmodel")}
                    className="move"
                  >
                    try it out
                  </p>
                </div>
                <div className="try-it-out">
                  <FaAngleRight className="fa-angle-right" />
                </div>
              </div>
            </div>
          </div>

          <div className="real-time model">
            <div className="img bg-real" />
            <div className="fit-content">
              <h4>Real-time Facerecogniton</h4>
              <p>
                Recognize multiple faces on your webcam and even displays your
                facial landmarks and expression.
              </p>
              <div className="try-it-out">
                <div className="try-it-out">
                  <p onClick={() => routeToggler("realtime")} className="move">
                    try it out
                  </p>
                </div>
                <div className="try-it-out">
                  <FaAngleRight className="fa-angle-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
