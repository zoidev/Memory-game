/*
 * Create a list that holds all of your cards

 /* Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let span = document.getElementsByClassName("close")[0];
let modal = document.getElementById('modal');         
let timer = document.querySelector(".timer");
let playAgainbtn = document.querySelector(".playAgainbtn");
let openCards = [];
let matchCards = [];
let moves = 0;
let starCounter;
let second = 0;
let minutes = 0;
let interval;
let started = false;
// DOM elements
const deck = document.querySelector(".deck")
const restart = document.querySelector(".restart");
const stars = document.querySelector(".stars");
const movesText = document.querySelector('.moves');
// Variables
const cards = ["fa-diamond","fa-paper-plane-o","fa-anchor", "fa-bolt","fa-cube",
				"fa-leaf","fa-bicycle", "fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor", "fa-bolt","fa-cube",
				"fa-leaf","fa-bicycle", "fa-bomb"];
// Functions
init();
  // Start game
  function init() {
    started = false;
    moves = 0;
    minutes = 0;
    seconds = 0;
    starCounter = 3;
    modal.style.display = "none";
    deck.innerHTML = "";
    movesText.innerHTML = 0;
    matchCards = [];
    resetTimer();
    generateCards(); 
  };

function generateCards(){
	  let iconsOne = shuffle(cards);
    let iconsTwo = shuffle(cards);
    let randomCards = iconsOne.concat(iconsTwo);
    randomCards = shuffle(randomCards);
    // Loop through each card and generate its HTML
    const fragment = document.createDocumentFragment();
    for (card in cards) {
      const randomCard = document.createElement("li");
      const icons = document.createElement("i");
      randomCard.setAttribute("class", 'card');
      icons.setAttribute("class", `fa ${cards[card]}`);
      fragment.appendChild(randomCard);
      randomCard.appendChild(icons);
    }
    deck.appendChild(fragment);
    starRating();
};
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// Timer
function startTimer(){
    interval = setInterval(
    function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
	}, 1000);
};
//end Timer
function endTimer() {
  clearInterval(interval);
};
//reset timer
function resetTimer () {
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
};
//set timer to start after the first click
function firstCardOpen() {
  if (!started) {
   second = 0;
   minute = 0; 
   hour = 0;
   startTimer();
   started = true;
  }
};

//display symbols
function displaySymbols (evt) {
  if (evt.target.classList.value === "card") {
    //start timer after first ''click''
    firstCardOpen()
    //allows to open only two cards at a time
    if (openCards.length < 2) {
  		evt.target.classList.add("show","open");
  		openCards.push(evt.target);
  	};
    //compare the two cards
	  if (openCards.length === 2) {
  		if (openCards[0].innerHTML === openCards[1].innerHTML) {
    		matching();     		
  			}
    	else {
    		setTimeout(notMatching, 500);
    	};
    	//count moves
    	moves++; 
    	//display moveCounter
    	displayMoves();
    	starRating();
      gameWin();
		};
	};
};
//if the open cards match
function matching (){
	  openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.remove("show", "open"); 
    //save matched cards in an array   
    matchCards.push(openCards[0],openCards[1]);
    //clear open cards array
   	openCards = [];
   	return matchCards;
};
// If the open cards don't match
function notMatching() {
  openCards[0].classList.remove("show", "open");
  openCards[1].classList.remove("show", "open");
  openCards = [];
};
//tracking moves and display
function displayMoves() {
    if (moves === 0) {
      movesText.innerHTML = "";
    }
    else {
      movesText.innerHTML = moves;
    }
};
// Update starCounter variable according to number of moves
  function starRating() {
    if (moves > 13 && moves < 16) {
      starCounter = 3;
    } else if (moves > 17 && moves < 27) {
      starCounter = 2;
    } else if (moves > 28) {
      starCounter = 1;
    }
    showStars(starCounter);
  };

// Generate html to display stars
  function showStars(num) {
    const starHtml = '<li class="fa fa-star"></li>';
    stars.innerHTML = "";
    for (let i = 0; i < num; i++) {
      stars.innerHTML += starHtml;
    }
  };
// Game win
function gameWin() {
if (matchCards.length === 16) {
  endTimer();
	modal.style.display = "block";
  modalscores();
	}
};
function modalscores() {

  let totalstars = document.querySelector(".totalstars");
	let totaltime = document.querySelector(".totaltime");
	let totalmoves = document.querySelector(".totalmoves");

  totalmoves.innerHTML = movesText.innerHTML;
	totalstars.innerHTML = stars.innerHTML;
	totaltime.innerHTML = timer.innerHTML;
};
// If user clicks outside pop-up, close it (www.w3schools.com)
 window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// Event Listeners
document.addEventListener("DOMContentLoaded", init);
deck.addEventListener("click", displaySymbols);
restart.addEventListener("click", init);
playAgainbtn.addEventListener("click", init);
