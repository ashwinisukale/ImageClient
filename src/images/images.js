import React, { useState, useEffect } from "react";
import { ImageClient } from "../clients/image-client";
import "./image.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Images = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const isPlayGameDisabled =
    selectedImages.length === 0 || selectedImages.length > 10;

  const history = useHistory();

  useEffect(() => {
    ImageClient.getImages().then(({ data }) => setImages(data.images));
  }, []);
  return (
    <div>
      <div>
        <h3>Select and upload images</h3>
        <input
          type="file"
          accept="image/*"
          multiple={true}
          max={5}
          onChange={(e) => {
            console.log(e.target.files);

            ImageClient.addImages(e.target.files)
              .then(ImageClient.getImages)
              .then(({ data }) => setImages(data.images));
          }}
        />
      </div>

      <hr />
      <div>
        <h3>Uploaded Images</h3>
        <div className="images-container">
          {images.map(({ id, avatar_url }) => (
            <div key={id} className="image-holder">
              <img src={`${axios.defaults.baseURL}${avatar_url}`} alt={id} />
              <input
                type="checkbox"
                value={
                  !!selectedImages.some((x) => x.avatar_url === avatar_url)
                }
                checked={
                  !!selectedImages.some((x) => x.avatar_url === avatar_url)
                }
                onChange={(e) => {
                  setSelectedImages(
                    !e.target.checked
                      ? selectedImages.filter(
                          (x) => x.avatar_url !== avatar_url
                        )
                      : selectedImages.concat({ id, avatar_url })
                  );
                }}
              />
            </div>
          ))}
        </div>
        <button
          disabled={isPlayGameDisabled}
          title={
            isPlayGameDisabled
              ? "Please select 1 to 10 images to play game"
              : undefined
          }
          onClick={() => {
            history.push("/game", { selectedImages });
          }}
        >
          Play a game
        </button>
      </div>
    </div>
  );
};
