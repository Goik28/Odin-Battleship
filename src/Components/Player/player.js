import { GameBoard } from "../GameBoard/gameBoard";

export class Player{
    name;
    gameBoard;
    turn = false;

    constructor(name){
        this.name = name;
        this.gameBoard = new GameBoard();
    }
}