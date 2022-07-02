import React from "react";
import "./imageLinkForm.css";

export default function ImageLinkForm(props) {
  const submitToggler = () => {
    if (props.route === "facemodel") {
      props.onFaceSubmit();
    }
    if (props.route === "foodmodel") {
      props.onFoodSubmit();
    }
    if (props.route === "colormodel") {
      props.onColorSubmit();
    }
    if (props.route === "apparelmodel") {
      props.onApparelSubmit();
    }
    if (props.route === "generalmodel") {
      props.onGeneralSubmit();
    }
  };
  return (
    <div className="ImagelinkForm">
      <input
        type="search"
        placeholder="paste image url here...."
        value={props.inputState}
        onChange={props.onInputChange}
      />
      {!props.processing && (
        <button className="bot" onClick={submitToggler}>
          Detect
        </button>
      )}
      {props.processing && (
        <div className="processing pro">
          <div className="one div"></div>
          <div className="two div"></div>
          <div className="three div"></div>
          <div className="four div"></div>
        </div>
      )}
    </div>
  );
}
