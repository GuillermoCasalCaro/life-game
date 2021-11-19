import React, { useRef } from 'react';
import './game.css';
import { calculateNextGeneration } from './Logic';

const Options = ({ size, setSize, internalState, setInternalState, gameState, setGameState, generationNumber, speed, setSpeed, reset }) => {

    return (
        <div className="options-container">
            <div>
                <label>
                    Size: {size}
                    <button onClick={() => { setSize(size + 1) }} style={{ marginLeft: '10px' }}>+ 1</button>
                    <button onClick={() => { setSize(size - 1) }}>- 1</button>
                </label>
            </div>
            <div>
                <label>
                    Speed: {speed} gens/s
                    <button onClick={() => { setSpeed(speed * 2) }} style={{ marginLeft: '10px' }}>x 2</button>
                    <button onClick={() => { setSpeed(speed / 2) }}>/ 2</button>
                </label>
            </div>
            <div>
                <label>
                    Generation:  {generationNumber.current}
                    <button
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                            gameState === "running" ? setGameState("iddle") : setGameState("running");
                        }}>
                        {gameState === "running" ? "Pause" : "Run"}
                    </button>
                    <button
                        onClick={reset}>
                        Clear
                    </button>
                </label>
            </div>
        </div >
    );
}

export default Options;
