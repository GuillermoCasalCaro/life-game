import React from 'react';
import './game.css';

const Options = ({ size, setSize }) => {

    return (
        <div className="options-container">
            <label>
                Size: {size}
                <button onClick={() => { setSize(size + 1) }} style={{ marginLeft: '10px' }}>+</button>
                <button onClick={() => { setSize(size - 1) }}>-</button>
            </label>
        </div >
    );
}

export default Options;