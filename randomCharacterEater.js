class RandomCharacterEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.eatenCharacterNum = 0;
        this.energy = 5;
        this.directions = [];
        this.characterSelector = Math.floor(Math.random() * 4) + 1
        console.log(this.characterSelector)
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }



        }
        return found;
    }


    move() {

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[this.y][this.x] = 0

            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY;
        }

        this.energy--
        this.eatenCharacterNum--
        this.die()
    }

    eat() {
        let emptyCells = this.chooseCell(this.characterSelector);
        let newCell = random(emptyCells);




        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;

            if (this.characterSelector == 1) {
                for (let i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            } else if (this.characterSelector == 2) {
                for (let i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            } else if (this.characterSelector == 3) {
                for (let i in predatoryArr) {
                    if (newX == predatoryArr[i].x && newY == predatoryArr[i].y) {
                        predatoryArr.splice(i, 1);
                        break;
                    }
                }
            } else if (this.characterSelector == 4) {
                for (let i in predatoryEaterArr) {
                    if (newX == predatoryEaterArr[i].x && newY == predatoryEaterArr[i].y) {
                        predatoryEaterArr.splice(i, 1);
                        break;
                    }
                }
            }

            this.eatenCharacterNum++

            this.mul()

        } else {
            this.move()
        }
    }

    die() {
        if (this.energy == 0) {
            matrix[this.y][this.x] = 0;
            for (let i in randomCharacterEaterArr) {
                if (this.x == randomCharacterEaterArr[i].x && this.y == randomCharacterEaterArr[i].y) {
                    randomCharacterEaterArr.splice(i, 1);
                    break;
                }
            }
            console.log("die")
        }

        

    }


    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);

        console.log(newCell)


        if (newCell && this.eatenCharacterNum >= 15) {
            let newX = newCell[0];
            let newY = newCell[0];
            matrix[newY][newX] = this.index

            let newRandomCharacterEater = new RandomCharacterEater(newX, newY, this.index);
            randomCharacterEaterArr.push(newRandomCharacterEater);
            this.energy = 7
        }

    }

}