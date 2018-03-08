let iconNames = {1: "fa fa-diamond", 2: "fa fa-paper-plane-o", 3: "fa fa-anchor", 4: "fa fa-bolt", 5: "fa fa-bomb", 6: "fa fa-bicycle", 7: "fa fa-cube", 8: "fa fa-leaf"};
let card_one = 0;
let card_two = 0;
let prevTd = 0;
let nextTd = 0;
let numClicksCoupleCards = 0;

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

function showHiddenCard(id) {
	document.getElementById(id).className = "card show";

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
			console.log("WELL DONE!!!");
		}
		else { // If doesn't match hidde again both cards.
			document.getElementById(nextTd).className = "card match";
			setTimeout(function() {
				document.getElementById(prevTd).className = "card";
				document.getElementById(nextTd).className = "card";
			}, 1000);
		}

		card_one = 0;
		card_two = 0;
		numClicksCoupleCards = 0;
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
}
createTableGridGame(4);