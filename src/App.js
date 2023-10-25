import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [numBoxes, setNumBoxes] = useState(0);
  const [resizingTimeout, setResizingTimeout] = useState(null);

  const handleNumBoxesChange = (event) => {
    setNumBoxes(event.target.value);
  }

  const addBoxes = (count) => {
    const boxes = [];
    for (let i = 0; i < count; i++) {
      boxes.push(<div key={i} className="box"></div>);
    }
    
    return boxes;
  }
  useEffect(() => {
    function handleResize() {
      setNumBoxes(numBoxes => numBoxes + 1);
      clearInterval(resizingTimeout);
      const newTimeout = setTimeout(() => {
        setNumBoxes(numBoxes => numBoxes + 1);
      }, 3000);
      setResizingTimeout(newTimeout);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [resizingTimeout]);


  return (
    <div>
      <label>Number of Boxes: </label>
      <input type="number" id="numBoxes" value={numBoxes} onChange={handleNumBoxesChange} min="0" />
      <button onClick={() => addBoxes(numBoxes)}>Submit</button>
      <div className="box-container">
        {addBoxes(numBoxes)}
      </div>
    </div>
  );
}

export default App;
