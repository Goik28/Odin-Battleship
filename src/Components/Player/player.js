import { GameBoard } from "../GameBoard/gameboard";

export class Player{
    name;
    gameBoard;
    turn = false;

    constructor(name){
        this.name = name;
        this.gameBoard = new GameBoard();
    }
}