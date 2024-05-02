import React, { useState } from "react";
import "./YoutubeForm.scss";

function YoutubeForm() {
  const [formYTV, setFormYTV] = useState({
    youtubeVideo: "",
    errors: {},
  });

  function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  const handleChange = (event) => {
    setFormYTV((prevState) => ({ ...prevState, errors: {} }));
    let vidId = "";
    setFormYTV((prevState) => ({
      ...prevState,
      youtubeVideo: event.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Check if username is empty
    if (!formYTV.youtubeVideo) {
      errors.youtubeVideo = "Video URL is required";
    }

    let regEx =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;

    if (!formYTV.youtubeVideo.match(regEx) && formYTV.youtubeVideo) {
      errors.youtubeVideo = "Video URL is incorect";
    }

    setFormYTV((prevState) => ({ ...prevState, errors }));

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      let vidId = YouTubeGetID(formYTV.youtubeVideo);
      let newVideo = {
        vidID: vidId,
        timeWatched: 0,
      };

      let savedList = localStorage.getItem("ytWatchingVideos");
      if (savedList) {
        savedList = JSON.parse(savedList);
        //check if video areay exist in the list
        if (savedList.filter((e) => e.vidID === newVideo.vidID).length > 0) {
          let errors = {};
          errors.youtubeVideo = "Video URL is already in the list";
          setFormYTV((prevState) => ({ ...prevState, errors }));
        } else {
          savedList.push(newVideo);
          localStorage.setItem("ytWatchingVideos", JSON.stringify(savedList));
        }
      } else {
        let newList = [newVideo];
        localStorage.setItem("ytWatchingVideos", JSON.stringify(newList));
      }
    } else {
      console.log(JSON.stringify(formYTV.errors));
    }
  };

  return (
    <div className="YoutubeForm">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <h4>Add your Youtube URL:</h4>
          <input
            type="text"
            name="youtubeVideo"
            value={formYTV.youtubeVideo}
            onChange={handleChange}
          />
          {formYTV.errors.youtubeVideo && (
            <p style={{ color: "red" }}>{formYTV.errors.youtubeVideo}</p>
          )}
        </label>
        <input className="btn btn-primary w-50" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default YoutubeForm;
