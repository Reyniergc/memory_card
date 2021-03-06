# memory_card
Project realized during the **Udacity Front-End Nano Degree course.**

**_In this link you can play the game if you want._** [Play Now!!!](https://reyniergc.github.io/memory_card/)

**Main goal of the project memory card.**

The main goal of this project is to create a friendly game where the players have to discover two matching cards with the same image. Once all the cards are matched the game ends. Also we can increment the difficult level with a countdown of 30 seconds. When the countdown reaches **15 seconds** the timer starts to blink to alert the user that the game is about the finish.


**External Frameworks Dependencies:**

**JavaScript** Files:
- js/bootstrap.min.js
- js/jquery.min.js

**Css** Files:
- css/font-awesome.min.css
- css/bootstrap.min.css

A bootstrap modal is used to congratulate  the player  once all cards are matched or to inform the player if he loses the game. In this modal you can find information about the timer and the number of stars used during the game. It also includes a button to close the modal and another one to restart the game.


On the other hand, the CSS **font-awesome.min.css** is used to fill the grid with eigth couple of images.


**_JAVASCRIPT FUNCTION EXPLANATION_**

This function converts a number of seconds in human readable time using the following format minutes:seconds (00:00).
- _**showTime(){}**_

Function to start the timer also starts the countdown.
- _**startTimer() {}**_

Build a matrix with a given dimention (N*N)
- _**buildMatrix(length) {}**_

This function searches and returns a free position of the matrix and fills this position with a number.
- _**randomMatrixFreePosition(matrix) {}**_

Builds a matrix with random numbers. This matrix is used to fill the Grid with Icons.
The Icons are stored in a JavaScript variable named **iconNames**
- _**matrixRandom(dimention) {}**_

The following function was explained after **external frameworks dependencies** in the current readme file.
- _**showModal() {}**_

This function returns true if the player wins the game, that is, if all cards are matched, otherwise return false.
- _**allCardsMatch() {}**_

This function does several things, for instance: Shows the image on the card, changes the css class to green when two cards are matched (or when the cards don’t match, in this case the color is red), counts  the numbers of moves, etc.
- _**showHiddenCard(id)**_

Creates dynamically a random grid and fills it with eigth couple images.
- _**createTableGridGame(dimention = 4) {}**_

The last function resets the game board, the timer, the star rating and the number of moves.
- _**restartGame(timer) {}**_
