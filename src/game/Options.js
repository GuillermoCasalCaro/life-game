import React from 'react';
import './game.css';
import { calculateNextGeneration } from './Logic';

const Options = ({ size, setSize, internalState, setInternalState }) => {

    return (
        <div className="options-container">
            <label>
                Size: {size}
                <button onClick={() => { setSize(size + 1) }} style={{ marginLeft: '10px' }}>+</button>
                <button onClick={() => { setSize(size - 1) }}>-</button>
            </label>
            <label>
                <button onClick={() => { setInternalState([...calculateNextGeneration(internalState)]) }}>Next Generation</button>
            </label>
        </div >
    );
}

export default Options;
