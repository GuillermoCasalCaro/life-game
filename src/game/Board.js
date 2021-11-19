import React, { useState, useEffect, useRef } from 'react';
import Options from './Options';
import './game.css'

const INITAL_GAME_SIZE = 15;

const initilizeInternalState = (gameSize) => {
    let board = [];
    for (let i = 1; i <= gameSize; i++) {
        let row = [];
        for (let j = 1; j <= gameSize; j++) {
            if (i === 1) {
                if (j === 2) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            } else if (i === 2) {
                if (j === 3) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            } else if (i === 3 & j <= 3) {
                row.push(1);
            } else {
                row.push(0);
            }
        }
        board.push(row);
    }
    return board;
};

const clearSelection = () => {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE?
        document.selection.empty();
    }
};

const Board = () => {
    const [gameSize, setGameSize] = useState(INITAL_GAME_SIZE);
    const [internalState, setInternalState] = useState(initilizeInternalState(gameSize));
    // const [mouseClicked, setMouseClicked] = useState(false);
    const boardContainer = useRef();
    var mouseClicked = useRef(false);

    useEffect(() => {
        setInternalState(initilizeInternalState(gameSize));
    }, [gameSize]);

    // useEffect(() => {
    //     generateBoard(internalState);
    // }, [internalState]);

    useEffect(() => {
        document.onmousedown = ((e) => {
            // setMouseClicked(true);
            mouseClicked.current = true;
        });
        document.onmouseup = ((e) => {
            // setMouseClicked(false);
            mouseClicked.current = false;
            clearSelection();
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
            onMouseEnter={() => { mouseClicked.current && changeCellState(i, j); }}
        >
        </div>
    }

    const changeCellState = (i, j) => {
        let newArr = [...internalState]
        newArr[i][j] = newArr[i][j] === 0 ? 1 : 0;
        setInternalState([...newArr]);
    }

    return (
        <div
            className="board-container"
            ref={boardContainer}
        >
            <Options
                size={gameSize}
                setSize={setGameSize}
                internalState={internalState}
                setInternalState={setInternalState}
            />
            {generateBoard(internalState)}
        </div >
    );
}

export default Board;
