import React, { useState } from 'react';
import './game.css'



const Board = () => {
    const [gameState, setGameState] = useState(Array(20).fill(false).map(() => Array(20).fill(false)));

    function generateBoard(size) {

        // let arrayAux = new Array(size);
        let arrayAux = Array(size).fill(false);
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

    return (
        <div className="board-container">
            {generateBoard(20)}
        </div >
    );
}

export default Board;
