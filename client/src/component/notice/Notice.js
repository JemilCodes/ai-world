import React from "react";
import "./notice.css";

export default function Notice({ showNotice }) {
  return (
    <div className={showNotice ? "notice-board" : "hidden"}>
      <h4>How it works !!!</h4>
      <p>
        To detect an image provide the url to that image in the required feild
      </p>
      <p>For each image you detect, your rank increases by one</p>
      <p>Enjoy!!!</p>
    </div>
  );
}
