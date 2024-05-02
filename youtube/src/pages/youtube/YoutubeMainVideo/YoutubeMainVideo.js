import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./YoutubeMainVideo.scss";

function YoutubeMainVideo() {
  const mainVideoDummy = {
    vidID: "Rr6LPf30lL4",
    timeWatched: 1000,
  };

  const [mainVideo, setmainVideo] = useState();

  useEffect(() => {
    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=" +
        mainVideoDummy.vidID +
        "&key=AIzaSyAsuFZIn50vZGmnpdVS-KCvR8tIoOKQbrM"
    )
      .then((response) => response.json())
      .then((data) => {
        let videoYT = data.items[0];
        console.log(videoYT);
        if (videoYT) {
          setmainVideo(videoYT);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="YoutubeMainVideo" data-testid="YoutubeYoutubeMainVideo">
      {/* {JSON.stringify(mainVideo.snippet.title)} */}
      {mainVideo && (
        <div className="videoDiv" key={mainVideo.id}>
          <iframe
            src={"https://www.youtube.com/embed/" + mainVideo.id}
            allowFullScreen
          ></iframe>
          <h5>{mainVideo.snippet.title}</h5>
          <p>{mainVideo.snippet.channelTitle}</p>
        </div>
      )}
    </div>
  );
}

export default YoutubeMainVideo;
