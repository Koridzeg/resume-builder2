import React from 'react'
import { useLocation } from 'react-router-dom';

const FinishedResume = () => {
    const location = useLocation();

    // Access the state from location.state
    const state = location.state;
  return (
    <div>{state.name}</div>
  )
}

export default FinishedResume