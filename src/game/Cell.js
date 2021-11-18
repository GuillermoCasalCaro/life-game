import React from 'react';

const Cell = (alive) => {
    const cellClass = alive ? 'cell-alive' : 'cell-dead';
    return (
        <div className={cellClass}></div >
    );
}

export default Cell;
