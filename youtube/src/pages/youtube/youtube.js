import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./youtube.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByNumber,
} from "../../state/counter/counterSlice";
import YoutubeList from "./YoutubeList/YoutubeList";
import YoutubeMainVideo from "./YoutubeMainVideo/YoutubeMainVideo";
import YoutubeForm from "./YoutubeForm/YoutubeForm";

function Youtube({ name }) {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="Youtube">
      SHalala {name} Count: {count}
      <button onClick={() => dispatch(increment())}> INCREMENT</button>
      <button onClick={() => dispatch(decrement())}> DECREMENT</button>
      <button onClick={() => dispatch(incrementByNumber(10))}>
        INCREMENT BY NUMBER
      </button>
      <YoutubeForm />
      <YoutubeMainVideo />
      <YoutubeList />
    </div>
  );
}

export default Youtube;
