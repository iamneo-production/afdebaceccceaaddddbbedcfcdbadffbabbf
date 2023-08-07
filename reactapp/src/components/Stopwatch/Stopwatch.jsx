import React, { useState, useEffect } from 'react';

const mystyle = {
        border: "none",
        display: "inline-block",
        margin: "5px 3px",
        fontSize: "20px"
      }

const Stopwatch = () => {
const [isRunning, setIsRunning] = useState(false);
const [startTime, setStartTime] = useState(null);
const [timeElapsed, setTimeElapsed] = useState(0);

const startTimer = () => {
setIsRunning(true);
setStartTime(Date.now() - timeElapsed);
};

const pauseTimer = () => {
setIsRunning(false);
};

const resumeTimer = () => {
setIsRunning(true);
setStartTime(Date.now() - timeElapsed);
};

const resetTimer = () => {
setIsRunning(false);
setStartTime(null);
setTimeElapsed(0);
};

useEffect(() => {
let timerId;

if (isRunning) {
    timerId = setInterval(() => {
    setTimeElapsed(Date.now() - startTime);
    }, 10);
}

return () => clearInterval(timerId);
}, [isRunning, startTime]);

const formatTime = (time) => {
const minutes = Math.floor(time / 60000);
const seconds = Math.floor((time / 1000) % 60);
const milliseconds = Math.floor((time % 1000) / 10);

return `${minutes.toString().padStart(2, '0')}:
        ${seconds.toString().padStart(2, '0')}:
        ${milliseconds.toString().padStart(2, '0')}`;
};

return (
<div style = {{height:"300px",width:"300px",border:"2px solid blue",margin:"auto"}}>
    <h1>React Stopwatch</h1>
    <p data-testid="time" id = "time">{formatTime(timeElapsed)}</p>

    {isRunning ? (
    <>
        <button style={mystyle} data-testid="pause" id="pause" onClick={pauseTimer}>
        Pause
        </button>
        <button style={mystyle} data-testid="reset" id = "reset" onClick={resetTimer}>
        Reset
        </button>
    </>
    ) : timeElapsed === 0 ? (
    <>  
        <button style={mystyle} data-testid="start" id = "start" onClick={startTimer}>
        Start
        </button>
        <button style={mystyle} data-testid="reset" id = "reset" onClick={resetTimer} disabled>
        Reset
        </button>
    </>
    ) : (
    <>
        <button style={mystyle} data-testid="resume" id = "resume" onClick={resumeTimer}>
        Resume
        </button>
        <button style={mystyle} data-testid="reset" id="reset" onClick={resetTimer}>
        Reset
        </button>
    </>
    )}
</div>
);
};

export default Stopwatch;
