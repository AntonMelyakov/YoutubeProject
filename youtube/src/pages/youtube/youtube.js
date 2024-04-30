import React from 'react';
import PropTypes from 'prop-types';
import './youtube.scss';
import { useSelector, useDispatch } from 'react-redux';
import { increment,decrement, incrementByNumber } from '../../state/counter/counterSlice';

function Youtube({name}) {
 
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();

  
  return (
    <div className="Youtube">
      SHalala {name} Count:  {count}
      <button onClick={() => dispatch(increment())}> INCREMENT</button>
      <button onClick={() => dispatch(decrement())}> DECREMENT</button>
      <button onClick={() => dispatch(incrementByNumber(10))}> INCREMENT BY NUMBER</button>
    </div>
  );
}

export default Youtube;
