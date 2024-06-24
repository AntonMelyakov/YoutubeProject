import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList } from "../../../state/youtube/ytListSlice";
import "./YoutubeList.scss";
import { addVideo } from "../../../state/youtube/ytMainVideoSlice";

function YoutubeList({ name }) {
  const videoListDummy = [
    {
      vidID: "Rr6LPf30lL4",
      timeWatched: 1000,
    },
    {
      vidID: "cdvcA5uxNlI",
      timeWatched: 1000,
    },
  ];

  const ytList = useSelector((state) => state.ytList.value);
  const ytMainVideo = useSelector((state) => state.ytMainVideo.value);
  const dispatch = useDispatch();

  const [videoList, setVideoList] = useState([]);
  const [videoLetter, setVideoLetter] = useState("a");

  function YTDurationToSeconds(duration) {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    match = match.slice(1).map(function (x) {
      if (x != null) {
        return x.replace(/\D/, "");
      }
    });

    var hours = parseInt(match[0]) || 0;
    var minutes = parseInt(match[1]) || 0;
    var seconds = parseInt(match[2]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  }

  function calcPercentage(video) {
    let percentage = parseInt(
      (video.timeWatched /
        YTDurationToSeconds(video.videoInfo.contentDetails.duration)) *
        100
    );
    return (
      <div className="w-100 bg-secondary bg-gradient">
        <div
          className=" bg-danger bg-gradient"
          style={{ width: `${percentage + "%"}`, height: "10px" }}
        ></div>
      </div>
    );
  }

  const setVideosWithInfo = async () => {
    let videoListWithParams = [];

    for (const video of ytList) {
      const asyncResult = await fetch(
        "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=" +
          video.vidID +
          "&key=AIzaSyAsuFZIn50vZGmnpdVS-KCvR8tIoOKQbrM"
      )
        .then((response) => response.json())
        .then((data) => {
          let videoYT = data.items[0];
          if (videoYT) {
            let videoWithParams = {
              timeWatched: video.timeWatched ?? 0,
              videoInfo: videoYT,
            };
            return videoWithParams;
          }
        })
        .catch((error) => console.error(error));
      videoListWithParams.push(asyncResult);
    }

    setVideoList(videoListWithParams);
    return videoListWithParams;
  };

  useEffect(() => {
    setVideosWithInfo();
  }, [ytList]);

  return (
    <div className="YoutubeList">
      {videoList && (
        <div className="videoDivsWrapper">
          {videoList.map((video) => (
            <div
              className={`videoDiv ${
                ytMainVideo.vidID === video.videoInfo.id ? "main" : ""
              }`}
              key={video.videoInfo.id}
              onClick={() =>
                dispatch(
                  addVideo({
                    vidID: video.videoInfo.id,
                    timeWatched: video.timeWatched,
                  })
                )
              }
            >
              <img
                src={video.videoInfo.snippet.thumbnails.high.url}
                height={video.videoInfo.snippet.thumbnails.high.height}
                width={video.videoInfo.snippet.thumbnails.high.width}
              />
              <h5>{video.videoInfo.snippet.title}</h5>
              <p>{video.videoInfo.snippet.channelTitle}</p>
              {calcPercentage(video)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YoutubeList;
