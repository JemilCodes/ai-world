import React from "react";
import Rank from "../rank/Rank";
import ImageLinkForm from "../imageLinkForm/ImageLinkForm";
import Image from "../image/Image";
import Notification from "../notification/Notification";
import { FaTimesCircle } from "react-icons/fa";

export default function FoodModel(props) {
  const [showConnectionError, setShowConnectionError] = React.useState(false);
  const [showServerError, setShowServerError] = React.useState(false);
  const [showApiError, setShowApiError] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  const foodList = (data) => {
    const clarifaiFood = data.outputs[0].data.concepts;
    return clarifaiFood;
  };

  const USER_ID = "s4gja0zdax1f";
  const PAT = "659df1e3e119480a9b955bce10a6317d";
  const APP_ID = "fd031e4b6a5f409f85f413ebe7754bcb";
  const MODEL_ID = "food-item-recognition";
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

  const onFoodSubmit = () => {
    setProcessing(true);
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProcessing(false);
        if (result.outputs[0].data.concepts.length >= 1) {
          return fetch("http://localhost:3001/image/foodmodel", {
            method: "put",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              id: props.userdata.id,
              foodEntries: props.userdata.foodEntries,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                props.setUser((prev) => {
                  return {
                    ...prev,
                    foodEntries: data.foodEntries,
                  };
                });
                props.setFood(foodList(result));
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
  const mappedFood = props.food.map((obj, i) => {
    return (
      <div key={i} className="table-element">
        <p>{obj.name}</p>
        <p>{Math.round( obj.value * 100)}%</p>
      </div>
    );
  });

  const clearFood = () => {
    props.setFood([]);
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
          onFoodSubmit={onFoodSubmit}
          route={props.route}
          processing={processing}
        />
        <div className="center">
          <Image inputState={props.inputState} />
          {props.food.length >= 1 && props.inputState.length > 10 && (
            <div className="result-wrapper">
              <div className="FaTimesCircle">
                <FaTimesCircle size="1.7em" color="white" onClick={clearFood} />
              </div>
              <div style={{ color: "white" }}>
                Number of detections: {props.food.length}
              </div>
              <div className="table-header">
                <p>Predicted Concepts</p>
                <p>Probability</p>
              </div>
              {mappedFood}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
