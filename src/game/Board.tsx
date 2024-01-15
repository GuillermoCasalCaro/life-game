import { useState, useEffect, useRef } from 'react';
import Options from './Options';
import { calculateNextGeneration } from './Logic';
import './game.css'

const INITAL_GAME_SIZE = 20;
const INITAL_GAME_SPEED = 4;
const ALIVE_CELL_COLORS = {
    "iddle": "yellow",
    "stucked": "red",
    "running": "green"
}

const Board = () => {
    const [gameSize, setGameSize] = useState(INITAL_GAME_SIZE);
    const [internalState, setInternalState] = useState(initilizeInternalState(gameSize));
    const [gameState, setGameState] = useState("iddle");
    const [speed, setSpeed] = useState(INITAL_GAME_SPEED);
    const boardContainer = useRef<HTMLDivElement>(null);
    const mouseClicked = useRef(false);
    const generationNumber = useRef(0);
    const internalStateRef = useRef(internalState);

    useEffect(() => {
        setInternalState(initilizeInternalState(gameSize));
    }, [gameSize]);

    useEffect(() => {
        internalStateRef.current = [...internalState];
        if (gameState === "stucked") {
            setGameState("iddle");
        }
    }, [internalState]);

    useEffect(() => {
        let timer;
        if (gameState === "running") {
            timer = setInterval(() => {
                const prevInternalState = [...internalStateRef.current];
                internalStateRef.current = [...calculateNextGeneration(internalStateRef.current)];
                console.log(prevInternalState);
                console.log(internalStateRef.current);
                if (prevInternalState.toString() === internalStateRef.current.toString()) {
                    setGameState("stucked");
                } else {
                    generationNumber.current = generationNumber.current + 1;
                    setInternalState(internalStateRef.current);
                }
            }, 1000 / speed);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [gameState, speed]);

    useEffect(() => {
        document.onmousedown = (() => {
            mouseClicked.current = true;
        });
        document.onmouseup = (() => {
            mouseClicked.current = false;
            clearSelection();
        });
    }, []);

    const reset = () => {
        setInternalState(clearInternalState(gameSize));
        setGameState("iddle");
        generationNumber.current = 0;
    }

    const generateBoard = (internalState) => {
        const board: JSX.Element[] = [];
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
        const row: JSX.Element[] = [];
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
        const cellClass = internalCell === 0 ? "cell-dead" : "cell-alive";
        const cellColor = "cell-" + ALIVE_CELL_COLORS[gameState];
        return <div
            id={`cell-${i}-${j}`}
            className={`${cellClass} ${cellColor}`}
            onMouseDown={() => { changeCellState(i, j) }}
            onMouseEnter={() => { mouseClicked.current && changeCellState(i, j); }}
        >
        </div>
    }

    const changeCellState = (i, j) => {
        const newArr = [...internalState]
        newArr[i][j] = newArr[i][j] === 0 ? 1 : 0;
        setInternalState([...newArr]);
    }

    console.log(gameState);

    return (
        <div className='mt-5 d-flex flex-column align-items-center'>
            <div className="mb-5" >
                <Options
                    size={gameSize}
                    setSize={setGameSize}
                    gameState={gameState}
                    setGameState={setGameState}
                    generationNumber={generationNumber}
                    speed={speed}
                    setSpeed={setSpeed}
                    reset={reset}
                />
            </div>
            <div
                className="board-container"
                ref={boardContainer}
            >
                {generateBoard(internalState)}
            </div >
        </div>
    );
}

export default Board;


const initilizeInternalState = (gameSize: number) => {
    const board: number[][] = [];
    for (let i = 1; i <= gameSize; i++) {
        const row: number[] = [];
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
            } else if (i === 3 && j <= 3) {
                row.push(1);
            } else {
                row.push(0);
            }
        }
        board.push(row);
    }
    return board;
};

const clearInternalState = (gameSize: number) => {
    const board: number[][] = [];
    for (let i = 1; i <= gameSize; i++) {
        const row: number[] = [];
        for (let j = 1; j <= gameSize; j++) {
            row.push(0);
        }
        board.push(row);
    }
    return board;
};

const clearSelection = () => {
    if (window.getSelection) {
        if (window.getSelection()?.empty) {  // Chrome
            window.getSelection()?.empty();
        } else if (window.getSelection()?.removeAllRanges) {  // Firefox
            window.getSelection()?.removeAllRanges();
        }
    } else if ((document as any).selection as any) {  // IE?
        (document as any).selection.empty();
    }
};