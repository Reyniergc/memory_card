const iconNames = {1: "fa fa-diamond", 2: "fa fa-paper-plane-o", 3: "fa fa-anchor", 4: "fa fa-bolt", 5: "fa fa-bomb", 6: "fa fa-bicycle", 7: "fa fa-cube", 8: "fa fa-leaf"};
let card_one = 0;
let card_two = 0;
let prevTd = 0;
let nextTd = 0;
let star_number = 3;
let numClicksCoupleCards = 0;
let counter = 0;
let coupleCardsNoMatch = 0;
let numOfMoves = 0;
let clear = undefined;
let countSeconds = 0

function showTime() {
	let timeFormat = "";

	if (countSeconds < 60) {
		timeFormat = (countSeconds < 10) ? "00:0" + countSeconds : "00:" + countSeconds;
	}
	else { // countSeconds > 60
		let minutes = Math.trunc(countSeconds / 60);
		let seconds = countSeconds % 60;

		timeFormat = (minutes < 10) ? "0" + minutes + ":" : minutes + ":";
		timeFormat += (seconds < 10) ? "0" + seconds : seconds;
	}

	return timeFormat;
}

// Function to start the timer.
function startTimer() {
	clear = setInterval(function() {
		document.getElementById("timer").innerHTML = showTime();
		countSeconds++;
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

function randomMatrixFreePosition(matrix) {
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
			let arrayFreePos = randomMatrixFreePosition(matrix);
			matrix[arrayFreePos[0]][arrayFreePos[1]] = parseInt(key);
		}
	}

	return matrix;
}

/* CONGRATULATIONS BOOTSTRAP MODAL */
function showModal() {
	let fixTime = showTime();
	fixTime = fixTime.substring(0, fixTime.length - 1) + (parseInt(fixTime[fixTime.length - 1]) - 1);

	document.getElementById("congratulationsHeader").innerHTML = "<span>Congratulations!!! You Won the game!!!</span>";
	document.getElementById("modalBody").innerHTML = "Time spent to win the game: <b>" + fixTime + "</b>. Number of stars " + star_number + " Star.";

	document.getElementById("startGame").setAttribute("onclick", "JavaScript:restartGame(true)");
	document.getElementById("startGame").disabled = false;

	$('#myModal').modal('show');
}
	
// Return true if all couple cards match otherwise return false.
function allCardsMatch() {
	return (document.getElementsByClassName("match").length === 16) ? true : false;
}

function showHiddenCard(id) {
	const classValue = document.getElementById(id).getAttribute("class");

	if ((classValue !== "card error") && (classValue !== "card open show") && (classValue !== "card match")) {
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
					showModal();
					clearInterval(clear); // Stop the timer.
				}
			}
			else { // If doesn't match hidde again both cards.
				(function(prevTd, nextTd) {
					document.getElementById(prevTd).className = "card error";
					document.getElementById(nextTd).className = "card error";

					setTimeout(function() {
						document.getElementById(prevTd).className = "card";
						document.getElementById(nextTd).className = "card";

					}, 1000);
				})(prevTd, nextTd);

				coupleCardsNoMatch += 2; // Count couple cards open not match.
				// Decrease the number of stars available.
				if ((star_number > 0) && (coupleCardsNoMatch === 10)) {
					document.getElementById("star_" + (star_number--)).style.visibility = "hidden";
					coupleCardsNoMatch = 0;
				}
			}

			card_one = 0;
			card_two = 0;
			numClicksCoupleCards = 0;
			numOfMoves += 2;
			document.getElementsByClassName("moves")[0].innerHTML = numOfMoves;
		}
	}
}

function createTableGridGame(dimention) {
	const matrix = matrixRandom(dimention);
	const ul = document.createElement("ul");
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
	document.getElementById("startGame").disabled = true;

	// Start the timer.
	startTimer();
}

/* A restart button allows the player to reset the
game board, the timer, and the star rating. */
function restartGame(timer) {
	document.getElementById("startGame").disabled = true;
	document.getElementById("star_1").style.visibility = "visible";
	document.getElementById("star_2").style.visibility = "visible";
	document.getElementById("star_3").style.visibility = "visible";
	
	$("#gridGame").find("li").each(function() {
		$(this).removeClass("show");
		$(this).removeClass("open");
		$(this).removeClass("match");
	});

	countSeconds = 0;
	numClicksCoupleCards = 0;
	coupleCardsNoMatch = 0;
	star_number = 3;
	numOfMoves = 0;
	document.getElementsByClassName("moves")[0].innerHTML = 0;

	/* Close the modal if is open.
	 * Start the timer one more time.
	*/
	if ($('#myModal').is(':visible')) {
		$('#myModal').modal('hide');
		startTimer();
	}
	
	// If we want to play again.
	if (timer) {
		startTimer();
	}
}