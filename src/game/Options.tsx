import './game.css';

const Options = ({ size, setSize, gameState, setGameState, generationNumber, speed, setSpeed, reset }) => {

    const increaseBoard = () => setSize((size: number) => size < 40 ? size + 1 : size);
    const decreaseBoard = () => setSize((size: number) => size > 10 ? size - 1 : size);
    const increaseSpeed = () => setSpeed((speed: number) => speed * 2);
    const decreaseSpeed = () => setSpeed((speed: number) => speed / 2);

    return (
        <div className="options-container d-flex flex-column" style={{ minWidth: '350px', gap: '15px' }}>
            <div className='d-flex align-items-center justify-content-between'>
                <div className="ui purple  label text-center" style={{ width: '120px' }}>
                    <span>Size: {size}</span>
                </div>
                <div>
                    <button style={{ width: '100px' }} className="ui button" onClick={increaseBoard}>Increase Board</button>
                    <button style={{ width: '100px' }} className="ui button" onClick={decreaseBoard}>Decrease Board</button>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
                <div className="ui purple  label text-center" style={{ width: '120px' }}>
                    <span>Speed: {speed} gens/s</span>
                </div>
                <div>
                    <button style={{ width: '100px' }} className="ui button" onClick={increaseSpeed}>Increase Speed</button>
                    <button style={{ width: '100px' }} className="ui button" onClick={decreaseSpeed}>Decrease Speed</button>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
                <div className="ui purple  label text-center" style={{ width: '120px' }}>
                    <span>Generation:  {generationNumber.current}</span>
                </div>
                <div>
                    <button
                        style={{ width: '100px' }}
                        className="ui labeled icon button "
                        onClick={() => {
                            gameState === "running" ? setGameState("iddle") : setGameState("running");
                        }}>
                        <i className={`${gameState === "running" ? "pause" : "play"} icon`}></i>
                        {gameState === "running" ? "Pause" : "Run"}
                    </button>
                    <button
                        style={{ width: '100px' }}
                        className="ui button"
                        onClick={reset}>
                        Clear
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Options;
