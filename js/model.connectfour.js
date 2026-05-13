"use strict";

class Model extends EventTarget {

    constructor() {
        super();

        this.rows = 6;
        this.cols = 7;

        this.board = this.createBoard();

        this.currentPlayer = 1;

        this.gameOver = false;
    }

    createBoard() {

        const board = [];

        for (let r = 0; r < this.rows; r++) {

            const row = [];

            for (let c = 0; c < this.cols; c++) {
                row.push(0);
            }

            board.push(row);
        }

        return board;
    }

    insertStone(col) {

        if (this.gameOver) return;

        for (let row = this.rows - 1; row >= 0; row--) {

            if (this.board[row][col] === 0) {

                this.board[row][col] = this.currentPlayer;

                this.dispatchStoneInserted();

                if (this.checkWin(row, col)) {
                    this.gameOver = true;
                    this.dispatchGameOver(this.currentPlayer);
                    return;
                }

                if (this.isDraw()) {
                    this.gameOver = true;
                    this.dispatchGameOver(0);
                    return;
                }

                this.changePlayer();
                return;
            }
        }

        this.dispatchColumnFull();
    }

    changePlayer() {

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

        this.dispatchEvent(new CustomEvent("playerChange", {
            detail: { player: this.currentPlayer }
        }));
    }

    isDraw() {

        return this.board.every(row => row.every(cell => cell !== 0));
    }

    checkWin(row, col) {

        const player = this.board[row][col];

        const directions = [
            [0, 1], [1, 0], [1, 1], [1, -1]
        ];

        for (let [dr, dc] of directions) {

            let count = 1;

            count += this.countDirection(row, col, dr, dc, player);
            count += this.countDirection(row, col, -dr, -dc, player);

            if (count >= 4) return true;
        }

        return false;
    }

    countDirection(row, col, dr, dc, player) {

        let count = 0;

        let r = row + dr;
        let c = col + dc;

        while (
            r >= 0 && r < this.rows &&
            c >= 0 && c < this.cols &&
            this.board[r][c] === player
            ) {
            count++;
            r += dr;
            c += dc;
        }

        return count;
    }


    dispatchStoneInserted() {

        this.dispatchEvent(new CustomEvent("stoneInserted", {
            detail: { board: this.board }
        }));
    }

    dispatchGameOver(winner) {

        this.dispatchEvent(new CustomEvent("gameOver", {
            detail: { winner }
        }));
    }

    dispatchColumnFull() {
        this.dispatchEvent(new CustomEvent("columnFull"));
    }
}