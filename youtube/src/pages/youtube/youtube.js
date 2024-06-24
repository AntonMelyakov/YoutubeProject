import React, { useEffect } from "react";
import "./youtube.scss";
import { useSelector, useDispatch } from "react-redux";

import { addList } from "../../state/youtube/ytListSlice";
import YoutubeList from "./YoutubeList/YoutubeList";
import YoutubeMainVideo from "./YoutubeMainVideo/YoutubeMainVideo";
import YoutubeForm from "./YoutubeForm/YoutubeForm";

function Youtube() {
  const ytList = useSelector((state) => state.ytList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    let videoListFromLocal = JSON.parse(
      localStorage.getItem("ytWatchingVideos")
    );
    if (videoListFromLocal) {
      dispatch(addList(videoListFromLocal));
    }
  }, []);

  return (
    <div className="Youtube">
      <YoutubeForm />
      {ytList.length !== 0 && <YoutubeMainVideo />}
      {ytList.length !== 0 && <YoutubeList />}
    </div>
  );
}

export default Youtube;
