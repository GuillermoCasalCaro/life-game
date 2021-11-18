import React, { useState } from 'react';
import Options from './Options';
import './game.css'

const generateBoard = (gameSize) => {
    let arrayAux = Array.from({ length: gameSize }, (v, i) => i);
    return (
        <>
            {
                arrayAux.map(() => {
                    return <div className="board-row">
                        {
                            arrayAux.map(() => {
                                return <div></div>
                            })
                        }
                    </div>

                })
            }
        </>
    );
}

const Board = () => {
    const [gameSize, setGameSize] = useState(10);
    return (
        <div className="board-container">
            <Options
                size={gameSize}
                setSize={setGameSize}
            />
            {generateBoard(gameSize)}
        </div >
    );
}

export default Board;
