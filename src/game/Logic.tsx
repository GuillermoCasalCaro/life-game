export const calculateNextGeneration = (internalState) => {
    const internalStateCopy = JSON.parse(JSON.stringify(internalState));
    for (let i = 0; i <= internalState.length - 1; i++) {
        for (let j = 0; j <= internalState.length - 1; j++) {
            internalStateCopy[i][j] = cellWillSurvive(internalState, i, j);
        }
    }
    return internalStateCopy;
};

const cellWillSurvive = (internalState, x, y) => {
    let countAliveNeighbours = 0;
    for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, internalState.length - 1); i++) {
        for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, internalState.length - 1); j++) {
            if (!(i === x && j === y)) {
                countAliveNeighbours += internalState[i][j];
            }
        }
        if (countAliveNeighbours > 3) {
            break;
        }
    }
    let willSurvive = 0;
    if (internalState[x][y] === 1 && (countAliveNeighbours === 2 || countAliveNeighbours === 3)) {
        willSurvive = 1;
    } else if (internalState[x][y] === 0 && countAliveNeighbours === 3) {
        willSurvive = 1;
    }
    return willSurvive;
};