const readlineSync = require('readline-sync');

class BattleshipsGame {
    constructor() {
        this.board = Array(3)
        .fill(null)
        .map(() => Array(3)
        .fill(null));

        this.ships = 2;
        this.shipCoordinates = [];
        this.guesses = new Set();
    }
    
    /* 
    this function will return a string consisting of a letter and a 
    number between a-b and 1-3 
    */
    getRandomCoordinate() {
        const letters = ["a", "b", "c"];
        const rows = letters[Math.floor(Math.random() * letters.length)];
        const colums = Math.floor(Math.random() * 3) + 1;
        return (rows + colums);
    }

    /*
    **this function will place a ship on a coordinate until all ships are placed
    **by 
    */
    placeShips() {
        for (let i = 0; i < this.ships; i++) {
            let placement = this.getRandomCoordinate();
            while (this.shipCoordinates.includes(placement)) {
              placement = this.getRandomCoordinate();
            }
            this.shipCoordinates.push(placement);
        } 
    }

    /*
    ** this function will utilize regex to make sure the guess starts with a 
    ** letter either a, b, or c and that the guess ends with either 1, 2, or
    ** 3. 
    */
    isValidGuess(guess) {
        return /^[a-c][1-3]$/i.test(guess);
    }
}
const game = new BattleshipsGame();
