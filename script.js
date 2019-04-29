function Random(min,max){
    var z = Math.floor(Math.random() * (max - min + 1)) + min; 
    return z;
}
function Matrix1(m, n, X, Y, g, eg, p, o){
    var Matrix = [];
    for(var y = 0; y < m; y++){
        Matrix[y] = [];
        for(var x = 0; x < n; x++){
            if(x == X && y == Y){
                Matrix[y][x] = 5;
            }
            else{
                Matrix [y][x] = 0;
            }
        }
    }
    for(var z = 0; z < g; z++){
        x = Random(0,(n - 1));
        y = Random(0,(m - 1));
        if(Matrix[y][x] !== 5){
            Matrix[y][x] = 1;
        }
        else{
            x = Random(0,(n - 1));
            y = Random(0,(m - 1));
            if(Matrix [y][x] !== 5){
                Matrix[y][x] = 1;
            }
        }
    }
    for(var z = 0; z < eg; z++){
        x = Random(0,(n - 1));
        y = Random(0,(m - 1));
        if(Matrix[y][x] !== 1 && Matrix[y][x] !== 5){
            Matrix[y][x] = 2;
        }
        else{
            x = Random(0,(n - 1));
            y = Random(0,(m - 1));
            if(Matrix[y][x] !== 5){
                Matrix[y][x] = 2;
            }
        }
    }
    for(var z = 0; z < p; z++){
        x = Random(0,(n - 1));
        y = Random(0,(m - 1));
        if(Matrix[y][x] !== 1 && Matrix [y][x] !== 2 && Matrix[y][x] !== 5){
            Matrix[y][x] = 3;
        }
        else{
            x = Random(0,(n - 1));
            y = Random(0,(m - 1));
            if(Matrix[y][x] !== 5){
                Matrix[y][x] = 3;
            }
        }
    }
    for(var z = 0; z < o; z++){
        x = Random(0,(n - 1));
        y = Random(0,(m - 1));
        if(Matrix [y][x] !== 1 &&  Matrix [y][x] !== 2 &&  Matrix [y][x] !== 3 &&  Matrix [y][x] !== 5){
            Matrix[y][x] = 4;
        }
        else{
            x = Random(0,(n - 1));
            y = Random(0,(m - 1));
            if(Matrix [y][x] !== 5){
                Matrix[y][x] = 4;
            }
        }
    }
    return Matrix;
}

var m = 25;
var n = 25;
if(m % 2 == 0 && n % 2 == 0){
    var X = Random(m / 2 - 1,m / 2);
    var Y = Random(n / 2 - 1,n / 2);
}
else{
    var X = m / 2 - 0.5;
    var Y = n / 2 - 0.5;
}
var g = 500;
var eg = 150;
var p = 50;
var o = 1;
var side = 15;
var grassArr = []; 
var eatGrassArr = []; 
var predatorArr = [];
var omnivorousArr = [];
var virusArr = [];
var matrix = Matrix1(m, n, X, Y, g, eg, p, o);

function setup() {
    frameRate(5);
    noStroke();
    createCanvas(matrix[0].length * side, matrix.length * side); 
    for (var y = 0; y < matrix.length; y++) { 
        for (var x = 0; x < matrix[y].length; x++) { 
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                var eatGrass = new EatGrass(x, y);
                eatGrassArr.push(eatGrass);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var omnivorous = new Omnivorous(x, y);
                omnivorousArr.push(omnivorous);
            }
            else if (matrix[y][x] == 5) {
                var virus = new Virus(X,Y);
                virusArr.push(virus);
            }
        }
    }
}
function draw() {
    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 0) {
                fill('#acacac');
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            } 
            else if (matrix[y][x] == 2) {
                fill("orange");
            } 
            else if (matrix[y][x] == 3) {
                fill("red");
            } 
            else if (matrix[y][x] == 4) {
                fill("blue");
            }  
            else if (matrix[y][x] == 5) {
                fill("black");
            }   
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();  
    }
    for (var i in eatGrassArr) {
        eatGrassArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in omnivorousArr) {
        omnivorousArr[i].eat();
    }
    for (var i in virusArr) {
        virusArr[i].eat();
    }
}