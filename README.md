# Memory Game Project
The game randomly shuffles the cards. A user wins once all cards have successfully been matched.

## Installing
- Clone the repository or download the zip folder of the project 
- Open the file ```index.html``` in your browser

## Instructions for users
1. Click over the cards of the canvas in order to reveal the hidden icon
2. You are allowed to click **only two** cards every time
3. If the cards are matched they will stay flipped
4. If they don't they will turn over
5. Once you find all the matches a pop-up window will inform you about your score (stars, time and moves)

             ***Your Challenge is to match cards in less time with less moves.***


## Instructions for Developers
This game is a great challenge to test your JavaScript knowledge. The Game Logic is that we create a deck of 12 cards, open two cards at a time and save then to an array. Then if they match we delete them from the first array `openCards[]` and save them to another `matchCards[]`. When the `matchCards[]` array is equal to 16 means that the user found all the combinations and then game is over.
Main functions:
* ```init()``` initialize the game and also is called with the restart button
* ```generateCards()``` creates a deck of 16 random cards using a loop to create a fragment 
* ```shuffle()``` this function shuffles the cards
* ```startTimer()``` sets the timer for the game
* ```displaySymbols``` its parameter is an event (click of a card), displays and compare cards
* ```matching``` and ```notMaching``` manipulate the openCards array


