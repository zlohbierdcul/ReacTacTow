import React, { useState } from 'react';
import './Game.css';
import {
    CircleRounded,
    CloseRounded,
    PanoramaFishEye,
    RadioButtonUnchecked,
    RadioButtonUncheckedOutlined,
} from '@mui/icons-material';

const winningCells = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

export const Game = ({ setIsRunning, setIsOver, setResult }) => {
    const [round, setRound] = useState(1);
    const [board, setBoard] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
    });

    const addSymbolToGrid = (id, type) => {
        let tempBoard = board;
        switch (type) {
            case 'circle':
                tempBoard[id] = 'o';
                break;
            case 'cross':
                tempBoard[id] = 'x';
                break;
        }

        setBoard(tempBoard);
    };

    const cellClickHandler = (e) => {
        if (
            e.target.className === 'game-grid-item' &&
            e.target.children.length === 0
        ) {
            const cellID = Number.parseInt(e.target.id.replace('cell-', ''));
            const type = round % 2 === 0 ? 'circle' : 'cross';
            addSymbolToGrid(cellID, type);
            setRound(round + 1);
            if (round > 0) checkGameStatus(cellID, type);
        }
    };

    const checkGameStatus = (cellID, type) => {
        const cellsToCheck = getCellsToCheck(cellID);
        let winFound = false;
        cellsToCheck.forEach((cells) => {
            if (checkCellsForWin(cells)) {
                console.log(type + ' wins!');
                setIsRunning(false);
                setIsOver(true);
                winFound = true;
                setResult(type);
                return;
            }
        });
        if (round === 9 && !winFound) {
            console.log('Draw!');
            setResult('draw');
            setIsRunning(false);
            setIsOver(true);
        }
    };

    const getCellsToCheck = (ogCell) => {
        let cellsToCheck = [];
        winningCells.forEach((winningCell) => {
            console.log(winningCell);
            if (winningCell.includes(ogCell)) {
                cellsToCheck.push(winningCell);
            }
        });
        return cellsToCheck;
    };

    const checkCellsForWin = (cells) => {
        const boardCells = cells.map((cellID) => {
            return board[cellID];
        });
        return boardCells.every((val, i, arr) => val === arr[0]);
    };

    return (
        <div className={'game-grid'}>
            {Object.entries(board).map((cell) => {
                return (
                    <div
                        className={'game-grid-item'}
                        key={'cell-' + cell[0]}
                        id={'cell-' + cell[0]}
                        onClick={cellClickHandler}
                    >
                        {cell[1] === '' ? (
                            cell[0]
                        ) : cell[1] === 'x' ? (
                            <CloseRounded></CloseRounded>
                        ) : (
                            <PanoramaFishEye></PanoramaFishEye>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
