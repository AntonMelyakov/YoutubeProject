import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./YoutubeMainVideo.scss";
import YouTube from "react-youtube";
import { addVideo } from "../../../state/youtube/ytMainVideoSlice";
import { addList } from "../../../state/youtube/ytListSlice";
import { RotatingLines } from "react-loader-spinner";

function YoutubeMainVideo() {
  const ytMainVideo = useSelector((state) => state.ytMainVideo.value);
  const ytList = useSelector((state) => state.ytList.value);
  const dispatch = useDispatch();
  const [mainVideo, setmainVideo] = useState();
  const [loader, setLoader] = useState(true);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: ytMainVideo.timeWatched ?? ytList[ytList.length - 1].timeWatched,
    },
  };

  const [intervalID, setIntervalID] = useState("");

  const onPlayerReady = () => {
    // access to player in all event handlers via event.target
    // e.g. event.target.pauseVideo();
    setLoader(false);
  };

  const onPlayerPause = (event) => {
    // get the current time of the video
    let currentTime = parseInt(event.target.getCurrentTime());

    saveTimeToVideo(currentTime);
    if (intervalID) {
      clearInterval(intervalID);
    }
  };

  const onPlayerPlay = (event) => {
    // get the current time of the video
    let timeInterval = setInterval(function () {
      let currentTime = parseInt(event.target.getCurrentTime());
      saveTimeToVideo(currentTime);
    }, 3000);
    setIntervalID(timeInterval);
  };

  function saveTimeToVideo(time) {
    if (Object.keys(ytMainVideo).length !== 0) {
      let newVideo = { vidID: ytMainVideo.vidID, timeWatched: time };
      let newList = [...ytList];
      let vidIndex = newList.findIndex(
        (ytVideo) => ytVideo.vidID == ytMainVideo.vidID
      );
      if (vidIndex !== undefined) {
        newList[vidIndex] = newVideo;
      } else {
        newList.push(newVideo);
      }
      localStorage.setItem("ytWatchingVideos", JSON.stringify(newList));
      dispatch(addList(newList));
    }
  }

  useEffect(() => {
    if (!loader) {
      setLoader(true);
    }
    if (ytList !== undefined && ytList.length !== 0) {
      if (Object.keys(ytMainVideo).length === 0) {
        //if mainVideo is empty, we are adding the last video from the list
        dispatch(addVideo(ytList[ytList.length - 1]));
      } else {
        let mainVideoFetched = ytMainVideo;
        fetch(
          "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=" +
            mainVideoFetched.vidID +
            "&key=AIzaSyAsuFZIn50vZGmnpdVS-KCvR8tIoOKQbrM"
        )
          .then((response) => response.json())
          .then((data) => {
            let videoYT = data.items[0];
            if (videoYT) {
              setmainVideo(videoYT);
            }
          })
          .catch((error) => console.error(error));
      }
    }
  }, [ytMainVideo]);

  return (
    <div className="YoutubeMainVideo" data-testid="YoutubeYoutubeMainVideo">
      {mainVideo && (
        <div
          className={`YoutubeMainVideo" ${loader ? "d-none" : ""}`}
          data-testid="YoutubeYoutubeMainVideo"
        >
          <div className="videoDiv" key={mainVideo.id}>
            <YouTube
              videoId={mainVideo.id}
              opts={opts}
              onReady={onPlayerReady}
              onPause={onPlayerPause}
              onPlay={onPlayerPlay}
            />
            <h5>{mainVideo.snippet.title}</h5>
            <p>{mainVideo.snippet.channelTitle}</p>
          </div>
        </div>
      )}
      {loader && (
        <div>
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeColor="blue"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      )}
    </div>
  );
}

export default YoutubeMainVideo;
