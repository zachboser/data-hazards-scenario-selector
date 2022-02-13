import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import scenarios from './components/scenarios/scenarios';

import { useState, useEffect } from 'react';



function HandleButtonPress(props) {
  if (props.buttonText === "Start") {
    props.setButtonText("Stop")
    props.setButtonColor("#DC3545")
    props.setSelecting(true)
  }
  if (props.buttonText === "Stop") {
    props.setButtonText("Start")
    props.setButtonColor("#FFC107")
    props.setSelecting(false)
  }
}

function Picker(props) {

  const [selecting, setSelecting] = useState(false)
  const [randomText, setRandomText] = useState("?")

  const [buttonColor, setButtonColor] = useState("#FFC107")
  const [buttonText, setButtonText] = useState("Start")

  const [index, setIndex] = useState(0)

  const intervalDuration = 100

  const buttonStyle = {
    "border": 0,
    "background-color": buttonColor,
    "width": "200px",
    "color": "#343a40",
    "border-radius": "30px",
    "font-size": "30px",
    "font-family": "Segoe UI"
  }

  // Running the timer
  useEffect(() => {
    let interval = null
    if (selecting) {
      interval = setInterval(() => {
        if (index < scenarios[props.data.type].options.length - 1) {
          let newIndex = index + 1
          setIndex(newIndex)
          setRandomText(scenarios[props.data.type].options[newIndex])
        }
        if (index == scenarios[props.data.type].options.length - 1) {
          setIndex(0)
          setRandomText(scenarios[props.data.type].options[0])
        }
      }, intervalDuration);
    } else if (!selecting) {
      clearInterval(interval)
    }



    //Clear up
    return () => {
      clearInterval(interval)
    }
  }, [selecting, index])



  return (
    <div className='sub-page-div'>
      <div className='sub-page-text'>
        <h2>{scenarios[props.data.type].label}</h2>
      </div>
      <div className='sub-page-text'>
        <h2>{randomText}</h2>
      </div>
      <div className='sub-page-button'>
        <Button style={buttonStyle}
          onClick={(event) => {
            HandleButtonPress({
              setButtonColor: setButtonColor,
              buttonText: buttonText,
              setButtonText: setButtonText,
              pressed: true,
              setSelecting: setSelecting,
              selecting: selecting,
              index: index,
              setIndex: setIndex
            })
          }}>{buttonText}</Button>
      </div>
    </div >
  )
}


function App() {
  return (
    <div className='app-div'>
      <h1> Sample Data Hazards Scenario Selector</h1>
      <div className='break'></div>
      <Picker data={{ "type": "scenario" }} />
      <Picker data={{ "type": "outcome" }} />
    </div>
  );
}

export default App;
