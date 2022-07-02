import React from "react";
import "./facerecognition.css";

import Rank from "../rank/Rank";
import ImageLinkForm from "../imageLinkForm/ImageLinkForm";
import Image from "../image/Image";
import Notification from "../notification/Notification";

export default function FaceRecognition(props) {
  const [showConnectionError, setShowConnectionError] = React.useState(false);
  const [showServerError, setShowServerError] = React.useState(false);
  const [showApiError, setShowApiError] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    const mappedFaceArray = clarifaiFace.map((faceObj) => {
      return {
        leftCol: faceObj.region_info.bounding_box.left_col * width,
        topRow: faceObj.region_info.bounding_box.top_row * height,
        rightCol: width - faceObj.region_info.bounding_box.right_col * width,
        bottomRow:
          height - faceObj.region_info.bounding_box.bottom_row * height,
      };
    });
    return mappedFaceArray;
  };

  const displayBox = (boxResult) => {
    props.setBoundingBox(boxResult);
  };

  const USER_ID = "s4gja0zdax1f";
  const PAT = "659df1e3e119480a9b955bce10a6317d";
  const APP_ID = "fd031e4b6a5f409f85f413ebe7754bcb";
  const MODEL_ID = "face-detection";
  const IMAGE_URL = `${props.inputState}`;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  const onFaceSubmit = () => {
    setProcessing(true);
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProcessing(false);
        if (result && result.outputs[0].data.regions.length >= 1) {
          fetch("http://localhost:3001/image/facemodel", {
            method: "put",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              id: props.userdata.id,
              faceEntries: props.userdata.faceEntries,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                props.setUser((prev) => {
                  return {
                    ...prev,
                    faceEntries: data.faceEntries,
                  };
                });
                displayBox(calculateFaceLocation(result));
              }
            })
            .catch(() => {
              setProcessing(false);
              setShowServerError(true);
            });
        } else  {
          setProcessing(false);
          setShowApiError(true);
          setShowServerError(true);
        }
      })
      .catch(() => {
        setProcessing(false);
        setShowConnectionError(true);
      });
  };
  setTimeout(() => {
    if (showConnectionError) {
      setShowConnectionError(false);
    }
    if (showServerError) {
      setShowServerError(false);
    }
    if (showApiError) {
      setShowApiError(false);
    }
  }, 5000);

  const box = props.boundingBox.map((mappedObj, i) => {
    return (
      <div
        key={i}
        className="bounding-box"
        style={{
          top: mappedObj.topRow,
          right: mappedObj.rightCol,
          bottom: mappedObj.bottomRow,
          left: mappedObj.leftCol,
        }}
      ></div>
    );
  });

  return (
    <>
      <Notification
        showConnectionError={showConnectionError}
        showServerError={showServerError}
        showApiError={showApiError}
      />
      <div className="center">
        <Rank userdata={props.userdata} route={props.route} />
        <ImageLinkForm
          inputState={props.inputState}
          onInputChange={props.onInputChange}
          onFaceSubmit={onFaceSubmit}
          route={props.route}
          processing={processing}
        />
        <div className="face-img-wrapper">
          <div className="face-img">
            <Image inputState={props.inputState} />
            {props.inputState.length > 10 && box}
          </div>
        </div>
      </div>
    </>
  );
}
