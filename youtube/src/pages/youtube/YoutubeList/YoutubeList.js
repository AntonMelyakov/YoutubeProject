import React, { useEffect, useState } from "react";
import "./YoutubeList.scss";

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

  const setVideosWithInfo = async (videosList) => {
    let videoListWithParams = [];

    for (const video of videosList) {
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
    setVideosWithInfo(videoListDummy);
  }, []);

  return (
    <div className="YoutubeList">
      {videoList && (
        <div className="videoDivsWrapper">
          {videoList.map((video) => (
            <div className="videoDiv" key={video.videoInfo.id}>
              <iframe
                src={"https://www.youtube.com/embed/" + video.videoInfo.id}
                allowFullScreen
              ></iframe>
              <h5>{video.videoInfo.snippet.title}</h5>
              <p>{video.videoInfo.snippet.channelTitle}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YoutubeList;
