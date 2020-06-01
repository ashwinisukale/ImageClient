import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { getSafe } from "../utils";
import axios from "axios";
import { CaptureClient } from "../clients";

export const GamePage = () => {
  const history = useHistory();
  const selectedImages = getSafe(
    () => history.location.state.selectedImages,
    []
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [records, setRecords] = useState([]);

  const currentImage = getSafe(() => selectedImages[currentImageIndex], {});

  const updateImage = useCallback(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (currentImageIndex) => (currentImageIndex + 1) % selectedImages.length
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedImages.length]);

  useEffect(updateImage, []);

  useEffect(() => {
    CaptureClient.getCaptures().then(({ data }) => setRecords(data));
  }, []);

  return (
    <div>
      <h3>Game</h3>
      {selectedImages.length ? (
        <div>
          <i>Image id {currentImage.id}</i>
          <div className="image-holder">
            <img
              src={`${axios.defaults.baseURL}/${currentImage.avatar_url}`}
              alt={currentImage.id}
            />
          </div>
          <button
            onClick={() => {
              CaptureClient.addCapture(currentImage.id)
                .then(CaptureClient.getCaptures)
                .then(({ data }) => setRecords(data));
            }}
          >
            Capture
          </button>
          <hr />
          <div>
            <h3>Capture Records</h3>
            <table>
              <thead>
                <tr>
                  <td>Image Id</td>
                  <td>Capture time</td>
                </tr>
              </thead>
              <tbody>
                {records.map(({ id, image_id, capture_time }) => {
                  return (
                    <tr key={id}>
                      <td>{image_id}</td>
                      <td>{capture_time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          Choose some images to play game. <Link to="/images">Start again</Link>
        </div>
      )}
    </div>
  );
};
