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
    ** this function will return a string consisting of a letter and a 
    ** number between a-b and 1-3 
    */
    getRandomCoordinate() {
        const letters = ["a", "b", "c"];
        const rows = letters[Math.floor(Math.random() * letters.length)];
        const colums = Math.floor(Math.random() * 3) + 1;
        return (rows + colums);
    }

    /*
    ** this function will place a ship on a coordinate until all ships are placed
    ** by 
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

    /*
    ** this function will check if a guess that is passed through the function
    ** if the guess does match the location that a ship is placed or not it 
    ** or if the guess has been guessed already it will print a correlating 
    ** message. 
    */
    checkGuess(guess) {
        //check if guess has or has not been guessed already
        if(this.guesses.has(guess)){
            console.log("You have already picked this location. Miss!");
        } else {
            //if the guess is new add the new guess
            this.guesses.add(guess);
            //check if the guess has "hit" or "not hit"
            if(this.shipCoordinates.includes(guess)) {
                console.log(`Hit. You have sunk a battleship. ${this.ships} ship${this.ships === 1 ? " " : "s"} remaining!`);
                //reduce the amount of ships after a ship has been guessed. 
                this.ships--; 
            } else {
                console.log("You have missed.");
            }
        }
    }
    startGame() {
        console.log("Press any key to start the game.");
        readlineSync.keyInPause();

        this.placeShips();

        const guess = readlineSync.question("Enter a location to strike ie 'A2' ");
        if(!this.isValidGuess(guess)) {
            console.log("Invalid guess");
        } else {
            this.checkGuess(guess);
            console.log("This is a valid guess");
        }
    }
}
const game = new BattleshipsGame();
game.startGame();