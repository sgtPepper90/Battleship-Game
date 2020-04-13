var right = function right(start) {
    if (start[0] + start.length * 10 < 100) {
        for (var i = 1; i < start.length; i++) {
            start[i] = start[0] + i * 10;
        }
        return start;
    } else return left(start);
};

var left = function left(start) {
    if (start[0] - start.length * 10 > 0) {
        for (var i = 1; i < start.length; i++) {
            start[i] = start[0] - i * 10;
        }
        return start;
    } else return right(start);
};

var down = function down(start) {
    var starting = start[0].toString();
    if (starting.length < 2) {
        starting = "0" + starting;
    }
    var starting2 = parseInt(starting[1]);

    if (starting2 + (start.length - 1) <= 9) {
        for (var i = 1; i < start.length; i++) {
            start[i] = start[0] + i;
        }
        return start;
    } else return up(start);
};

var up = function up(start) {
    var starting = start[0].toString();
    if (starting.length < 2) {
        starting = "0" + starting;
    }
    var starting2 = parseInt(starting[1]);

    if (starting2 - (start.length - 1) >= 0) {
        for (var i = 1; i < start.length; i++) {
            start[i] = start[0] - i;
        }
        return start;
    } else return down(start);
};

function checkTaken(check) {
    for (var i = 0; i < check.length; i++) {
        test = false;
        if (takenPositions.indexOf(check[i]) >= 0) {
            test = true;
            break;
        }
    }
}

var genFunctions = [right, left, down, up];
var takenPositions = [];
var randomNumber;
var randomFunction;
var shipPosition;
var test;
var carrier_found = false;
var battleship_found = false;
var submarine_found = false;
var cruiser_found = false;
var destroyer_found = false;
var tries = 0;
var trueGuess = [];

function generateShip(size, takenPositions) {
    randomNumber = Math.floor(Math.random() * 100);
    while (takenPositions.indexOf(randomNumber) >= 0) {
        randomNumber = Math.floor(Math.random() * 100);
    }
    randomFunction = Math.floor(Math.random() * 4);
    shipPosition = [randomNumber];
    for (var i = 1; i < size; i++) {
        shipPosition.push(null);
    }
    genFunctions[randomFunction](shipPosition);
    checkTaken(shipPosition);
    while (test) {
        shipPosition = [randomNumber];
        for (var j = 1; j < size; j++) {
            shipPosition.push(null);
        }
        randomFunction = Math.floor(Math.random() * 4);
        genFunctions[randomFunction](shipPosition);
        checkTaken(shipPosition);
    }
    return shipPosition;
}

for (var i = 5; i > 1; i--) {
    generateShip(i, takenPositions);
    takenPositions = takenPositions.concat(shipPosition);
    if (i == 3) {
        for (var j = 0; j < 2; j++)
            generateShip(i, takenPositions);
        takenPositions = takenPositions.concat(shipPosition);
    }
}

console.log(takenPositions);

var carrierPosition = [takenPositions[0], takenPositions[1], takenPositions[2], takenPositions[3], takenPositions[4]];
var battleshipPosition = [takenPositions[5], takenPositions[6], takenPositions[7], takenPositions[8]];
var cruiserPosition = [takenPositions[9], takenPositions[10], takenPositions[11]];
var submarinePosition = [takenPositions[12], takenPositions[13], takenPositions[14]];
var destroyerPosition = [takenPositions[15], takenPositions[16]];

var takenPositionsArrayed = [carrierPosition, battleshipPosition, cruiserPosition, submarinePosition, destroyerPosition];

function check2() {
    if (trueGuess.length == 17) {
        var winMessage = document.getElementById("winMessage");
        winMessage.classList.add("cover");
        winMessage.innerHTML = "You won in " + tries + " tries!";
    }  
}

function reverse(i) {
    if (i > 0 && i < 10) {
        return i * 10;
    } else if (i % 10 == 0 || i == 0) {
        return i - (i / 10 * 9);
    } else {
        var a = i.toString();
        var b = a[1] + a[0];
        return parseInt(b, 10);
    }
}

function hitOrMiss(i) {
    return function () {
        if (takenPositions.indexOf(reverse(i)) >= 0) {
            tries++;
            if (trueGuess.indexOf(reverse(i)) < 0) {
                trueGuess.push(reverse(i));
            }
            check2();
            check_carrier();
            check_battleship();
            check_submarine();
            check_cruiser();
            check_destroyer();
            if (carrier_found == true) {
                var carrier = document.getElementById("carrier").classList.add("shipHit");
            }
            if (battleship_found == true) {
                var battleship = document.getElementById("battleship").classList.add("shipHit");
            }
            if (submarine_found == true) {
                var submarine = document.getElementById("submarine").classList.add("shipHit");
            }
            if (cruiser_found == true) {
                var cruiser = document.getElementById("cruiser").classList.add("shipHit");
            }
            if (destroyer_found == true) {
                var destroyer = document.getElementById("destroyer").classList.add("shipHit");
            }
            return document.getElementById(reverse(i)).classList.add("hit");

        } else {
            tries++;
            return document.getElementById(reverse(i)).classList.add("miss");
        }
    };
}

var cells = document.querySelectorAll("td");

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", hitOrMiss(i));

}

function check_carrier() {
    for (var i = 0; i < 5; i++) {
        if (trueGuess.indexOf(carrierPosition[i]) >= 0) {
            carrier_found = true;
        } else {
            carrier_found = false;
            break;
        }
    }
    return carrier_found;
}

function check_battleship() {
    for (var i = 0; i < 4; i++) {
        if (trueGuess.indexOf(battleshipPosition[i]) >= 0) {
            battleship_found = true;
        } else {
            battleship_found = false;
            break;
        }
    }
    return battleship_found;
}

function check_submarine() {
    for (var i = 0; i < 3; i++) {
        if (trueGuess.indexOf(submarinePosition[i]) >= 0) {
            submarine_found = true;
        } else {
            submarine_found = false;
            break;
        }
    }
    return submarine_found;
}

function check_cruiser() {
    for (var i = 0; i < 3; i++) {
        if (trueGuess.indexOf(cruiserPosition[i]) >= 0) {
            cruiser_found = true;
        } else {
            cruiser_found = false;
            break;
        }
    }
    return cruiser_found;
}

function check_destroyer() {
    for (var i = 0; i < 2; i++) {
        if (trueGuess.indexOf(destroyerPosition[i]) >= 0) {
            destroyer_found = true;
        } else {
            destroyer_found = false;
            break;
        }
    }
    return destroyer_found;
}