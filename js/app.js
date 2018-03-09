let iconNames = {1: "fa fa-diamond", 2: "fa fa-paper-plane-o", 3: "fa fa-anchor", 4: "fa fa-bolt", 5: "fa fa-bomb", 6: "fa fa-bicycle", 7: "fa fa-cube", 8: "fa fa-leaf"};
let card_one = 0;
let card_two = 0;
let prevTd = 0;
let nextTd = 0;
let numClicksCoupleCards = 0;
let counter = 0;
let clear = undefined;
let hours = [0, 0];
let minutes = [0, 0];
let seconds = [0, 0];

// Reset the timer 00:00:00
function resetTimer() {
	seconds = [0, 0];
	minutes = [0, 0];
	hours   = [0, 0];
}

// Function to start the timer.
function startTimer() {
	clear = setInterval(function() {
		if (seconds[1] === 10) {
			seconds[0]++;
			seconds[1] = 0;
		}

		// Reset seconds.
		if ((seconds[0] + "" + seconds[1]) === "59") {
			seconds[0] = 0;
			seconds[1] = 0;
			minutes[1]++;
		}

		if (minutes[1] === 3) {
			minutes[0]++;
			minutes[1] = 0;
		}

		// Reset minutes.
		if ((minutes[0] + "" + minutes[1]) === "59") {
			minutes[0] = 0;
			minutes[1] = 0;
			hours[1]++;
		}

		if (hours[1] === 1) {
			hours[0]++;
			hours[1] = 0;
		}

		if ((hours[0] + "" + hours[1]) === "24") {
			resetTimer();
		}

		document.getElementById("timer").innerHTML = hours[0] + "" + hours[1] + ":" + minutes[0] + "" + minutes[1] + ":" + seconds[0] + "" + seconds[1];
		seconds[1]++;

	}, 1000);
}

function buildMatrix(length) {
	let matrix = [];
	let arrayAux = [];

	for (let row = 0; row < length; row++) {
		for (let col = 0; col < length; col++) {
			arrayAux[col] = undefined;
		}
		matrix.push(arrayAux.slice());
	}
	
	return matrix;
}

function randomMatixFreePosition(matrix) {
	while (true) {
		let row = Math.floor((Math.random() * 4) + 0);
		let col = Math.floor((Math.random() * 4) + 0);
		
		if (!matrix[row][col]) {
			return [row, col];
		}
	}
}

function matrixRandom(dimention) {
	let matrix = buildMatrix(dimention);
	
	for (let key in iconNames) {
		for (let twoTimes = 0; twoTimes < 2; twoTimes++) {
			let arrayFreePos = randomMatixFreePosition(matrix);
			matrix[arrayFreePos[0]][arrayFreePos[1]] = parseInt(key);
		}
	}

	return matrix;
}

// Return true if all couple cards match otherwise return false.
function allCardsMatch() {
	return (document.getElementsByClassName("match").length === 16) ? true : false;
}

function showHiddenCard(id) {
	let classValue = document.getElementById(id).getAttribute("class");

	if ((classValue !== "card open show") && (classValue !== "card match")) {
		document.getElementById(id).className = "card open show";

		if (numClicksCoupleCards === 0) {
			card_one = document.getElementById("input_" + id).value;
			prevTd = id;
			++numClicksCoupleCards;
		}
		else if (numClicksCoupleCards === 1) {
			card_two = document.getElementById("input_" + id).value;
			nextTd = id;
			if ((prevTd !== nextTd) && (card_one === card_two)) {
				document.getElementById(prevTd).className = "card match";
				document.getElementById(nextTd).className = "card match";

				if (allCardsMatch()) {
					alert("Winner");
				}
			}
			else { // If doesn't match hidde again both cards.
				(function(prevTd, nextTd) {
					setTimeout(function() {
						document.getElementById(prevTd).className = "card";
						document.getElementById(nextTd).className = "card";
					}, 1000);
				})(prevTd, nextTd);
			}

			card_one = 0;
			card_two = 0;
			numClicksCoupleCards = 0;
		}
	}
}

function createTableGridGame(dimention) {
	let matrix = matrixRandom(dimention);
	let ul = document.createElement("ul");
	ul.setAttribute("class", "deck");
	let id_td = 1;

	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix.length; col++) {			
			li = document.createElement("li");
			li.setAttribute("id", id_td);
			li.setAttribute("onclick", "showHiddenCard(" + id_td + ")");
			li.setAttribute("class", "card");

			let inputHidden = document.createElement("input");
			inputHidden.setAttribute("type", "hidden");
			inputHidden.setAttribute("value", matrix[row][col]);
			inputHidden.setAttribute("id", "input_" + id_td++);
			
			let icon = document.createElement("i");
			icon.setAttribute("class", iconNames[matrix[row][col]]);

			li.appendChild(icon);
			li.appendChild(inputHidden);
			ul.appendChild(li);
		}
	}

	document.getElementById("gridGame").appendChild(ul);
	// Start the timer.
	startTimer();
}
createTableGridGame(4);

/* A restart button allows the player to reset the
game board, the timer, and the star rating. */
function restartGame() {
	let show = document.getElementsByClassName("show");
	let match = document.getElementsByClassName("match");

	for (let index = 0; index < show.length; index++) {
		show[index].className = "card";
	}

	for (let index = 0; index < match.length; index++) {
		match[index].className = "card";
	}

	resetTimer();
}