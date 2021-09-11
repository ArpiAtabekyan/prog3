class PredatoryEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 8;
        this.directions = [];
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
            this.energy--
        }

        this.die()

    }

    eat() {
        let emptyCells = this.chooseCell(3);
        let newCell = random(emptyCells);

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;

            for (let i in predatoryArr) {
                if (newX == predatoryArr[i].x && newY == predatoryArr[i].y) {
                    predatoryArr.splice(i, 1);
                    break;
                }
            }

            this.energy++

            this.mul()
        } else {
            this.move()
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (let i in predatoryEaterArr) {
                if (this.x == predatoryEaterArr[i].x && this.y == predatoryEaterArr[i].y) {
                    predatoryEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);

        console.log(newCell)


        if (newCell && this.energy >= 10) {

            let newX = newCell[0];
            let newY = newCell[0];
            matrix[newY][newX] = this.index

            let newPredatoryEater = new PredatoryEater(newX, newY, this.index);
            predatoryEaterArr.push(newPredatoryEater);

            this.energy = 7
        }

        console.log(this.energy)

    }

}