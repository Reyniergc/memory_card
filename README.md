# memory_card
Project realized during the Udacity Front-End Nano Degree

**Main goal of the project memory card.**

The main goal of this project is to create a friendly game where the players have to discover two matching cards with the same image. Once all the cards are matched the game ends. Also we can increment the difficult level with a countdown of 30 seconds. When the countdown is in **15 seconds** the timer start to blink to alert the user that the game is finishing.


**External Frameworks Dependencies:**

**JavaScript** Files:_
- js/bootstrap.min.js
- js/jquery.min.js

**Css** Files:_
- css/font-awesome.min.css
- css/bootstrap.min.css

A bootstrap modal is used to congratulation the player when all cards match or if the player lose the game. In this modal you can find information about the timer and the number of stars used during the game. Also a botton to close the modal and other one to restart the game. 


On the other hand the CSS **font-awesome.min.css** is used to fill the grid with eigth couple of images.


**_JAVASCRIPT FUNCTION EXPLANATION_**

This function converts a number of seconds in human readable time using the following format minutes:seconds (00:00).
- _**showTime(){}**_

Function to start the timer also start the countdown.
_**startTimer() {}**_

Build a matrix with a given dimention (N*N)
_**buildMatrix(length) {}**_

This function search and return a free position of the matrix and fill this position with a number.
_**randomMatrixFreePosition(matrix) {}**_

Build a matrix with random numbers. This matrix is use to fill the Grid with Icons.
The Icons are stored in a JavaScript variable named **iconNames**
_**matrixRandom(dimention) {}**_

The following function was explained after **external frameworks dependencies** in the current readme file.
_**showModal() {}**_

This function return true if the player win the game, that is, if all cards are matched otherwise return false.
_**allCardsMatch() {}**_

This function do several things, for instance: Show the image on the card, change the css class to green when two cards are matched or when the cards doesn't matched in this case the color is red, count the numbers of moves, etc.
_**showHiddenCard(id)**_

Create dynamically a random grid and fill it with eigth couple images.
_**createTableGridGame(dimention = 4) {}**_

The last function reset the game board, the timer, the star rating and the number of moves.
_**restartGame(timer) {}**_
