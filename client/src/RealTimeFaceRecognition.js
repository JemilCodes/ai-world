import * as faceapi from "face-api.js";
import React from "react";
import "./realTime.css";
import Notification from "./component/notification/Notification";

export default function RealTimeFaceRecognition(props) {
  const videoHeight = 480;
  const videoWidth = 640;
  const videoRef = React.useRef();
  const canvasRef = React.useRef();

  const [initialized, setInitialized] = React.useState(false);
  const [webCamError, setWebCamError] = React.useState(false);

  React.useEffect(() => {
    const loadModels = async () => {
      const Models = process.env.PUBLIC_URL + "./models";
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(Models),
        faceapi.nets.faceLandmark68Net.loadFromUri(Models),
        faceapi.nets.faceRecognitionNet.loadFromUri(Models),
        faceapi.nets.faceExpressionNet.loadFromUri(Models),
      ]).then(startVideo);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(() => {
        setWebCamError(true);
      });
  };
  const handlePlay = () => {
    setInterval(async () => {
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      console.log(detections);
      if (detections.length > 0) {
        setInitialized(true);
      }
    }, 100);
  };

  return (
    <>
      <Notification webCamError={webCamError} />
      <div className="center">
        {initialized ? (
          <p style={{ color: "white", fontSize: "25px" }}>
            AI has been initialized successfully, have fun!!!
          </p>
        ) : (
          <>
            {!webCamError && (
              <div className="processing">
                <div>Initializing</div>
                <div className="one div"></div>
                <div className="two div"></div>
                <div className="three div"></div>
                <div className="four div"></div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="display-flex">
        <video
          ref={videoRef}
          autoPlay
          muted
          height={videoHeight}
          width={videoWidth}
          onPlay={handlePlay}
        />
        <canvas ref={canvasRef} className="absolute" />
      </div>
      {!webCamError && (
        <h4 style={{ color: "red" }}> Reload this page to close the WebCam </h4>
      )}
    </>
  );
}
