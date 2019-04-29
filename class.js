class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
    }

    newDirections() {
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
    chooseDirections(t) {
        this.newDirections();
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < n && y >= 0 && y < m) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;

        if (this.multiply == 3) {
            var getDirections = this.chooseDirections(0);
            var direction = random(getDirections);

            if (direction) {
                var x = direction[0];
                var y = direction[1];
                var grass = new Grass(x, y);

                grassArr.push(grass);
                matrix[y][x] = 1;

                this.multiply = 0;
            }
        }
    }
}
class EatGrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 5; 
    }

    newDirections() {
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
    chooseDirections(t) {
        this.newDirections();
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < n && y >= 0 && y < m) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var getDirections = this.chooseDirections(0);
        var direction = random(getDirections);

        if (direction) {
            var x = direction[0];
            var y = direction[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy--;

            if (this.energy < 3) {
                this.die();
            }
        }
        else{
            this.energy--;
            if (this.energy < 3) {
                this.die();
            }
        }
    }
    mul() {
        var getDirections = this.chooseDirections(0);
        var direction = random(getDirections);

        if (direction) {
            var x = direction[0];
            var y = direction[1];
            var eatGrass = new EatGrass(x, y);

            eatGrassArr.push(eatGrass);
            matrix[y][x] = 2;
        } 
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eatGrassArr) {
            if (this.x == eatGrassArr[i].x && this.y == eatGrassArr[i].y) {
                eatGrassArr.splice(i, 1);
            }
        }
    }
    eat() {
        var getDirections = this.chooseDirections(1);
        var direction = random(getDirections);

        if (direction) {
            var x = direction[0];
            var y = direction[1];
        
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
                
            this.x = x;
            this.y = y;
            this.energy++;
            this.multiply++;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            if (this.multiply == 10) {
                this.mul();
                this.multiply = 0;
            }
        }
        else {
            this.move();
        }
    }
}

class Predator{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 5;
    }

    newDirections() {
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
    chooseDirections(t) {
        this.newDirections();
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < n && y >= 0 && y < m) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var getDirections = this.chooseDirections(0);
        var direction = random(getDirections);

        if (direction) {
            var x = direction[0];
            var y = direction[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy--;

            if (this.energy < 3) {
                this.die();
            }
        }
        else{
            var getDirections = this.chooseDirections(1);
            var direction = random(getDirections);

            if (direction) {
                var x = direction[0];
                var y = direction[1];

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 1;

                this.x = x;
                this.y = y;
                this.energy--;
                
                if (this.energy < 3) {
                    this.die1();
                }
            }
            else{
                this.energy--;
                if (this.energy < 3) {
                    this.die();
                }
            }
        }
    }
    mul() {
        var getDirections = this.chooseDirections(0);
        var direction = random(getDirections);

        if (direction) {
            var x = direction[0];
            var y = direction[1];
            var predator = new Predator(x, y);

            predatorArr.push(predator);
            matrix[y][x] = 3;
        } 
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
    die1() {
        matrix[this.y][this.x] = 1;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
    eat() {
        var getDirections = this.chooseDirections(2);
        var direction = random(getDirections);

        if (direction) {
            var x = direction[0];
            var y = direction[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;

                for (var i in eatGrassArr) {
                if (x == eatGrassArr[i].x && y == eatGrassArr[i].y) {
                    eatGrassArr.splice(i, 1);
                }
            }
            if (this.multiply == 10) {
                 this.mul();
                this.multiply = 0;
            }
        }
        else {
            this.move();    
        }
    }
}

class Omnivorous{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 17;
    }

    newDirections() {
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
    chooseDirections(t) {
        this.newDirections();
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < n && y >= 0 && y < m) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul(){
        var getDirections = this.chooseDirections(0);
        var direction = random(getDirections);

        if (direction) {
            var x = direction[0];
            var y = direction[1];
            var omnivorous = new Omnivorous(x, y);

            omnivorousArr.push(omnivorous);
            matrix[y][x] = 4;
        } 
        else{
            var x = Random(0,(m - 1));
            var y = Random(0,(n - 1));
            if(matrix[y][x] == 0){
                var omnivorous = new Omnivorous(x, y);

                omnivorousArr.push(omnivorous);
                matrix[y][x] = 4;
            }
            else{
                var x = Random(0,(m - 1));
                var y = Random(0,(n - 1));

                if(matrix[y][x] == 0){
                    var omnivorous = new Omnivorous(x, y);
    
                    omnivorousArr.push(omnivorous);
                    matrix[y][x] = 4;
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in omnivorousArr) {
            if (this.x == omnivorousArr[i].x && this.y == omnivorousArr[i].y) {
                omnivorousArr.splice(i, 1);
                break; 
            }      
        }
    }
    eat(){
        var x = Random(0,(m - 1));
        var y = Random(0,(n - 1));

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 3) { 

                this.die();
            }
        }
        else if(matrix[y][x] == 1){
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy++;
            this.multiply++;
            if (this.multiply == 30) {

                this.mul();
                this.multiply = 0;
            }
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else if(matrix[y][x] == 2){
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy++;
            this.multiply++;

            if (this.multiply == 30) {

                this.mul();
                this.multiply = 0;
            }
            for (var i in eatGrassArr) {
                if (x == eatGrassArr[i].x && y == eatGrassArr[i].y) {
                    eatGrassArr.splice(i, 1);
                    break;
                }
            }
        }
        else if(matrix[y][x] == 3){
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy++;
            this.multiply++;

            if (this.multiply == 30) {

                this.mul();
                this.multiply = 0;
            }
            for (var i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Virus{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
    }

    newDirections() {
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
    chooseDirections(t) {
        this.newDirections();
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < n && y >= 0 && y < m) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat(){
        var getDirections0 = [];
        var getDirections1 = [];
        var getDirections2 = [];
        var getDirections3 = [];

        var x;
        var y;
        getDirections0.push(this.chooseDirections(1));
        getDirections1.push(this.chooseDirections(2));
        getDirections2.push(this.chooseDirections(3));
        getDirections3.push(this.chooseDirections(4));
        var getDirections = getDirections0.concat(getDirections1, getDirections2, getDirections3);
        for(var i in getDirections){
            for(var j in getDirections[i]){
                x = getDirections[i][j][0];
                y = getDirections[i][j][1];
                
            }
        }
        

        if(x && y){
            this.multiply++;

            if(this.multiply == 15){
                for(var i in virusArr){
                    virusArr[i].mul();
                    this.multiply = 0;
                }
            }
            else{
                if(matrix[y][x] == 1){
                    matrix[y][x] = 0;
                    for (var i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            break; 
                        }      
                    }
                }
                else if(matrix[y][x] == 2){
                    matrix[y][x] = 0;
                    for (var i in eatGrassArr) {
                        if (x == eatGrassArr[i].x && y == eatGrassArr[i].y) {
                            eatGrassArr.splice(i, 1);
                            break; 
                        }      
                    }
                }
                else if(matrix[y][x] == 3){
                    matrix[y][x] = 0;
                    for (var i in predatorArr) {
                        if (x == predatorArr[i].x && y == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                            break; 
                        }      
                    }
                }
                else if(matrix[y][x] == 4){
                    matrix[y][x] = 0;
                    for (var i in omnivorousArr) {
                        if (x == omnivorousArr[i].x && y == omnivorousArr[i].y) {
                            omnivorousArr.splice(i, 1);
                            break; 
                        }      
                    }
                }
            }
        }
    }
    mul(){
        var x;
        var y;
        for(var i in this.directions){
            x = this.directions[i][0];
            y = this.directions[i][1];

            if (x >= 0 && x < n && y >= 0 && y < m){
                if(matrix[y][x] != 5){
                        virusArr[i].eat();
                        var virus = new Virus(x,y);

                        virusArr.push(virus);
                        matrix[y][x] = 5;
                }
            }
        }
    }
}