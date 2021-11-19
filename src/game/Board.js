import React, { useState, useEffect } from 'react';
import Options from './Options';
import './game.css'

const initilizeInternalState = (gameSize) => {
    let board = [];
    for (let i = 1; i <= gameSize; i++) {
        let row = [];
        for (let j = 1; j <= gameSize; j++) {
            row.push(0);
        }
        board.push(row);
    }
    return board;
}

const Board = () => {
    const [gameSize, setGameSize] = useState(10);
    const [internalState, setInternalState] = useState(initilizeInternalState(gameSize));
    const [mouseClicked, setMouseClicked] = useState(false);

    useEffect(() => {
        setInternalState(initilizeInternalState(gameSize));
    }, [gameSize]);

    useEffect(() => {
        document.onmousedown = ((e) => {
            setMouseClicked(true);
        });
        document.onmouseup = ((e) => {
            setMouseClicked(false);
        });
    }, []);

    const generateBoard = (internalState) => {
        let board = [];
        let i = 0;
        internalState.forEach(internalRow => {
            board.push(generateBoardRow(internalRow, i));
            i++;
        });
        return <>
            {board}
        </>
    }

    const generateBoardRow = (internalRow, i) => {
        let row = [];
        let j = 0;
        internalRow.forEach(internalCell => {
            row.push(generateBoardCell(internalCell, i, j));
            j++;
        });
        return <div id={`row-${i}`} className="board-row">
            {row}
        </div>
    }

    const generateBoardCell = (internalCell, i, j) => {
        let cellClass = internalCell === 0 ? "cell-dead" : "cell-alive";
        return <div
            id={`cell-${i}-${j}`}
            className={cellClass}
            onMouseDown={() => { changeCellState(i, j) }}
            onMouseEnter={() => { mouseClicked && changeCellState(i, j) }}
        >
        </div>
    }

    const changeCellState = (i, j) => {
        let newArr = [...internalState]
        newArr[i][j] = newArr[i][j] === 0 ? 1 : 0;
        setInternalState(newArr);
    }

    return (
        <div className="board-container">
            <Options
                size={gameSize}
                setSize={setGameSize}
            />
            {generateBoard(internalState)}
        </div >
    );
}

export default Board;
