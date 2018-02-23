console.log("Script loaded!");


/*-------------------- Initializing --------------------*/

/***** Cards to be used in the game *****/
const cards = ["img/Ace of Diamonds.jpg",
			   "img/Ace of Diamonds.jpg",
			   "img/Jack of Spades.jpg",
			   "img/Jack of Spades.jpg",
			   "img/Queen of Hearts.jpg",
			   "img/Queen of Hearts.jpg",
			   "img/Ace of Clubs.jpg",
			   "img/Ace of Clubs.jpg",
			   "img/Ace of Hearts.jpg",
			   "img/Ace of Hearts.jpg",
			   "img/Jack of Diamonds.jpg",
			   "img/Jack of Diamonds.jpg"];
			   
const cover = "img/Cover.jpg"; //The cover of the card.	   

/***** Declaring variables *****/
const numberOfCards = cards.length;
let inPlay = []; 		//Randomized card array
let cardsToUse = cards;	//Transfer cards-array to preserv the original.
let isTurned = [false, false, false, false, false]; //To check which cards is turned over.
let isFound = [false, false, false, false, false]; //To check if card has been matched.
let cardsToTurn = [true, true, true, true, true, true]; //To check which cards to reset.
let isFirstCard = true; //To check if it is the first or second card being turned.
let choosenCard; //To hold the first card that is turned.
let pairs = 0;
let numberOfTries = 0;


/*-------------------- Game play --------------------*/

/***** Readys the game *****/
randomizeCards();


/***** Create cards *****/
let ul = document.getElementById("board")

for (let i = 0; i < numberOfCards; i++) {
	let li = document.createElement("LI");
	let img = document.createElement("IMG");
	$(img).attr("id", i);
	$(img).addClass("cards");
	$(img).attr("src", "img/Cover.jpg");
	$(img).attr("alt", "Playing Card");
	
	li.appendChild(img);
	ul.appendChild(li);
}

/***** Gets the card placement from the DOM *****/			   
let card = [];

for (let i = 0; i < numberOfCards; i++) {
	card.push(document.getElementById(i));
}
	

/***** Card click event *****/
$(".cards").click(function(e) {
	if (!isTurned[e.target.id]) {
		turnCardOver(e.target, inPlay[this.id]);
		isTurned[this.id] = true;
		if (isFirstCard) {
			choosenCard = inPlay[this.id];
			cardsToTurn[this.id] = false;
			isFirstCard = false;
		} else {
			if (choosenCard == inPlay[this.id]) {
				cardsToTurn[this.id] = false;
				sucsess();
			} else {
				fail();
			}
			isFirstCard = true;
		}
	}
	if (pairs == numberOfCards / 2) {
		setTimeout(gameWon, 800);
	}
});

/***** Reset button click event *****/
$(".btn").click(function() {
	reset();
	console.log("Button is working!")
});

/***** Turns over the card *****/
function turnCardOver(fromCard, toCard) {
	$(fromCard).animate({width: '0px', height: '300px'}, 300, () => {
	$(fromCard).attr("src", toCard);
	});
	$(fromCard).animate({width: '200px'}, 300);
}

/***** Turns all cards face down *****/
function turnAllBack() {
	for (let i = 0; i < numberOfCards; i++) {
		if (isTurned[i] && !isFound[i]) {
			turnCardOver(card[i], cover);
			isTurned[i] = false;
		}
	}
}

/***** Puts the cards in random order for a new game *****/
function randomizeCards() {
	let randomNumber; 
	for (let i = 0;i < numberOfCards; i++) {
		randomNumber = Math.floor(Math.random() * cardsToUse.length);
		inPlay.push(cardsToUse[randomNumber]);
		cardsToUse.splice(randomNumber, 1);	
	}
}

/***** When a match is found *****/
function sucsess() {
	$(".message").text("You Found a Match!");
	for (let i = 0; i < numberOfCards; i++) {
		if (!cardsToTurn[i]) {
			isFound[i] = true;
		}
	}
	pairs++;
	numberOfTries++;
}

/***** When it's not a match *****/
function fail() {
	$(".message").text("Sorry, no match. Try again!");
	$(".cards").delay(1000);
	for (let i = 0; i < numberOfCards; i++) {
		cardsToTurn[i] = true;
	}
	turnAllBack();
	numberOfTries++;
}

function gameWon() {
	let tries = "You found all matches with only " + numberOfTries + " tries.";
	$("#win").css("display", "block");
	$("#tries").text(tries);
	$("#full-canvas").css("filter", "blur(10px)");
	$("#reset").css("filter", "initial");
}

/***** To start new game *****/
function reset() {
	location.reload(); //Reloads script.
}