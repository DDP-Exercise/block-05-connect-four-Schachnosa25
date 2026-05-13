"use strict";

/*******************************************************
 *     Connect Four - 100p
 *
 *     It's gaming time! The kids from Kindergarten would
 *     love to play some connect four! Unfortunately, kids
 *     nowadays can't use any wood or paper games anymore.
 *     It's digital or they go crazy. And we don't want crazy,
 *     do we?
 *
 *     Your task is to create a nice game of connect four.
 *     Make it an interesting >digital product< (I've heard
 *     you are an expert for that)! Make it visually appealing.
 *     Wrap it into a story. Choose or create two characters
 *     with rivalry to give your game more flesh. Try to
 *     match the appearance and/or the behavior of the game to
 *     the background-story (character arch).
 *
 *     Technical requirements:
 *     The game should be intuitive to play. It's a children's
 *     game after all. Think of a good way to handle your input.
 *
 *     The two players use the same input method and play in turns
 *     (= No need for separate input).
 *
 *     The game should give some hint or warning, when a player
 *     wants to put a stone on a file that is already full.
 *
 *     The game should give a clear visual representation of
 *     the winning stones and announce the winner.
 *
 *     Use MVC and custom Events. The model dispatches events for:
 *      - Player Change (view visually highlights current player)
 *      - Stone was inserted (view visually represents all the stones)
 *      - Game is over (Draw or Winner)
 *
 *     The creation of this game should take you somewhere between
 *     8-10 hours of concentrated work.
 *     Schachnosa Viertbauer - 2026-05-08
 *******************************************************/

class Controller {

    constructor(model, view) {

        this.model = model;
        this.view = view;

        this.init();
    }

    init() {

        this.view.renderBoard(this.model.board);

        document.getElementById("board")
            .addEventListener("click", (event) => {

                const col = event.target.closest(".cell")?.dataset.col;

                if (col === undefined) return;

                this.model.insertStone(Number(col));
            });

        this.registerModelEvents();
    }

    registerModelEvents() {

        this.model.addEventListener("stoneInserted", (event) => {

            this.view.renderBoard(event.detail.board);
        });

        this.model.addEventListener("playerChange", (event) => {

            this.view.updatePlayer(event.detail.player);
        });

        this.model.addEventListener("gameOver", (event) => {

            this.view.showWinner(event.detail.winner);
        });

        this.model.addEventListener("columnFull", () => {

            this.view.showColumnFull();
        });
    }
}