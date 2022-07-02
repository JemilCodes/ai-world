import React from "react";
import "./image.css";

export default function Image(props) {
  return (
    <>
      {props.inputState.length > 10 && (
        <div className="image-wrapper">
          <img
            alt="#"
            src={props.inputState}
            id="input-image"
            className="image"
          />
        </div>
      )}
    </>
  );
}
