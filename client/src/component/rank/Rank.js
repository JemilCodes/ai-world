import React from "react";
import "./rank.css";

export default function Rank(props) {
  return (
    <>
      <div className="Rank">
        <p style={{ color: "white" }}>Wellcome</p>
        <div className="rank-name">{`${props.userdata.name}, your current rank is ...`}</div>
        {props.route === "facemodel" && (
          <div className="rank-entries">#{props.userdata.faceEntries}</div>
        )}
        {props.route === "foodmodel" && (
          <div className="rank-entries">#{props.userdata.foodEntries}</div>
        )}
        {props.route === "colormodel" && (
          <div className="rank-entries">#{props.userdata.colorEntries}</div>
        )}
        {props.route === "apparelmodel" && (
          <div className="rank-entries">#{props.userdata.apparelEntries}</div>
        )}
        {props.route === "generalmodel" && (
          <div className="rank-entries">#{props.userdata.generalEntries}</div>
        )}
      </div>
    </>
  );
}
