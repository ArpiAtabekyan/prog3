function matrixGenerator(l) {
    // Local matrix
    var m = [];
    // Fill matrix
    for (var i = 0; i < l; i++) {
        m[i] = [];
        for (var j = 0; j < l; j++) {
            // Stexcel random tiv
            var rand = random(0, 100);
            // Lcnel matrix tokosayin haraberutyamb
            if (rand <= 35) {
                // Xot
                m[i][j] = 1;
            } else if (rand > 35 && rand <= 50) {
                // Xotaker
                m[i][j] = 2;
            } else if (rand > 50 && rand <= 65) {
                // Gishatich
                m[i][j] = 3;
            } else if (rand > 65 && rand <= 70) {
                // Nor kerpar 1
                m[i][j] = 4;
            } else if (rand > 70 && rand <= 85) {
                // Nor kerpar 2
                m[i][j] = 5;
            } else {
                // Datarkutyun
                m[i][j] = 0;
            }
        }
    }
    // Veradarcnel matrix
    return m;
}

// Haytararel global matrix popoxakan
var matrix;


let grassArr = [];
let grassEaterArr = [];
let predatoryArr = [];
let predatoryEaterArr = [];
let randomCharacterEaterArr = [];

var side = 120;


function setup() {

    matrix = matrixGenerator(20);

    frameRate(2);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    // var gr = new Grass(1,2,1);
    // var emptyCells = gr.chooseCell(0);

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y, 1);
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge)
            } else if (matrix[y][x] == 3) {
                let pr = new Predatory(x, y, 3);
                predatoryArr.push(pr)
            } else if (matrix[y][x] == 4) {
                let pe = new PredatoryEater(x, y, 4);
                predatoryEaterArr.push(pe)
            } else if (matrix[y][x] == 5) {
                let re = new RandomCharacterEater(x, y, 5);
                randomCharacterEaterArr.push(re)
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }

        }
    }

    for (let i in grassArr) {
        grassArr[i].mul();
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in predatoryArr) {
        predatoryArr[i].eat()
    }

    for (let i in predatoryEaterArr) {
        predatoryEaterArr[i].eat()
    }

    for (let i in randomCharacterEaterArr) {
        randomCharacterEaterArr[i].eat()
    }
}
