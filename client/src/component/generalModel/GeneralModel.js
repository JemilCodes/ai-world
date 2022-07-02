import React from "react";
import Rank from "../rank/Rank";
import ImageLinkForm from "../imageLinkForm/ImageLinkForm";
import Image from "../image/Image";
import Notification from "../notification/Notification";
import { FaTimesCircle } from "react-icons/fa";

export default function GeneralModel(props) {
  const [showConnectionError, setShowConnectionError] = React.useState(false);
  const [showServerError, setShowServerError] = React.useState(false);
  const [showApiError, setShowApiError] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  const USER_ID = "s4gja0zdax1f";
  const PAT = "659df1e3e119480a9b955bce10a6317d";
  const APP_ID = "fd031e4b6a5f409f85f413ebe7754bcb";
  const MODEL_ID = "general-image-recognition";
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

  const GeneralList = (data) => {
    const GeneralList = data.outputs[0].data.concepts;
    console.log(GeneralList);
    return GeneralList;
  };

  const onGeneralSubmit = () => {
    setProcessing(true);
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProcessing(false);
        if (result.outputs[0].data.concepts.length >= 1) {
          fetch("http://localhost:3001/image/generalmodel", {
            method: "put",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              id: props.userdata.id,
              generalEntries: props.userdata.generalEntries,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                props.setUser((prev) => {
                  return {
                    ...prev,
                    generalEntries: data.generalEntries,
                  };
                });
                props.setGeneral(GeneralList(result));
              }
            })
            .catch(() => {
              setProcessing(false);
              setShowServerError(true);
            });
        }
        if (!result) {
          setProcessing(false);
          setShowApiError(true);
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
  const generals = props.general.map((obj, i) => {
    return (
      <div key={i} className="table-element">
        <p>{obj.name}</p>
        <p>{Math.round( obj.value * 100)}%</p>
      </div>
    );
  });

  const clearGenerals = () => {
    props.setGeneral([]);
  };

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
          onGeneralSubmit={onGeneralSubmit}
          route={props.route}
          processing={processing}
        />
        <div className="center">
          <Image inputState={props.inputState} />
          {props.general.length >= 1 && props.inputState.length > 10 && (
            <div className="result-wrapper">
              <div className="FaTimesCircle">
                <FaTimesCircle
                  size="1.7em"
                  color="white"
                  onClick={clearGenerals}
                />
              </div>
              <div style={{ color: "white" }}>
                Number of detections: {props.general.length}
              </div>
              <div className="table-header">
                <p>Predicted Concepts</p>
                <p>Probability</p>
              </div>
              {generals}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
