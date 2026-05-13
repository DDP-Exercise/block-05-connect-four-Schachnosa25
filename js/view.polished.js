"use strict";

class ViewPolished {

    constructor() {

        this.boardElement = document.getElementById("board");
        this.messageElement = document.getElementById("message");
    }


    renderBoard(board) {

        const cells = document.querySelectorAll(".cell");

        let index = 0;

        for (let row = 0; row < board.length; row++) {

            for (let col = 0; col < board[row].length; col++) {

                cells[index].className = "cell";

                if (board[row][col] === 1) {
                    cells[index].classList.add("player1");
                }

                if (board[row][col] === 2) {
                    cells[index].classList.add("player2");
                }

                index++;
            }
        }
    }


    showWinner(winner) {

        if (winner === 1) {this.messageElement.textContent = "Murphy wins!🎉";}

        if (winner === 2) {this.messageElement.textContent = "Newton wins!🎉";}

        this.messageElement.style.color = "orange";
    }


    showColumnFull() {

        this.messageElement.textContent = "Column is full!";
        this.messageElement.style.color = "orange";
    }


    updatePlayer(player) {

        if (player === 1) {this.messageElement.textContent = "Murphy's turn";}

        if (player === 2) {this.messageElement.textContent = "Newton's turn";}
    }
}