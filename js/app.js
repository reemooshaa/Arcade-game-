

 let cards= ['fa fa-diamond', 'fa fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-cube', 'fa-cube',
            'fa-bolt', 'fa-bolt',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb',
          ];


function generateCard(card){
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

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
}


/*
 * set up the event listener for a card. If a card is clicked:
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 var deck = document.querySelector('.deck');

 function initGame(){
   var cardHTML= shuffle(cards).map(function(card){
     return generateCard(card);
   });
   deck.innerHTML = cardHTML.join('');
 }

 let moves =0;
 let clockOff= true;
 let time  =0;
 let clockId;
 let matched = 0;
 const TOTAL_PAIRS = 8;


 initGame();
 var allCards = document.querySelectorAll('.card');
 let openCards = []; // array to save the selected cards
 var moveCounter = document.querySelector('.moves');




allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (!card.classList.contains('open') && !card.classList.contains('show') &&!card.classList.contains('match')){
      if(openCards.length <2){
    openCards.push(card); // push the card into the array
    card.classList.add('open','show'); // flip the card


    //check if cards match
    if (openCards.length === 2){
      if (openCards[0].dataset.card == openCards[1].dataset.card){
        matched++; // increment the nummber of matched cards
         openCards[0].classList.add('match');
         openCards[0].classList.add('open');
         openCards[0].classList.add('show');

         openCards[1].classList.add('match');
         openCards[1].classList.add('open');
         openCards[1].classList.add('show');
         checkWin();
         openCards=[]; //impties the array of opend cards
      }else {


      // if not match, hide
      setTimeout(function(){
        openCards.forEach(function(card){
          card.classList.remove('open','show');
        });
        openCards=[];
      },500);
    }
    moves += 1; // to increment the move
    moveCounter.innerText = moves;
    checkScore(moves); // check the moves for score

  }
}
    }
  });
});

function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);

    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

function checkScore(moves){
  // if the moves are greater than 16 remove 1 star, if moves greater than 24 remove 2 stars
  if (moves === 16 || moves === 24){
    hideStar();
  }

}
// To remove stars if there are more than 16 moves.
function hideStar(){
  const startList = document.querySelectorAll('.stars li');
  for (star of startList){
    if(star.style.display !== 'none'){
      star.style.display = 'none';
      break;
    }
  }
}

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (clickTarget){
    if (clockOff){
      startClock();
      clockOff = false;
    }
  }
});

// start the time.
function startClock(){
  clockId = setInterval(() =>{
    time ++;
    // call the display function to show the time.
    displayTime();
  },1000);
}

// to display the time in the game.
function displayTime(){
  const clock =document.querySelector('.clock');

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

 // to display the time in the proper format.
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  }else {
    clock.innerHTML = `${minutes}:0${seconds}`;
  }
}
// this function to stop the clock
function stopClock(){
  clearInterval(clockId);
}

// the function will toggle the hide class on and off:
function toggleModal(){
  const modal = document.querySelector('.modal__background');
  modal.classList.toggle('hide');
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount =0;
  for (star of stars){
    if (star.style.display !== 'none'){
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}
// fucntion to state the inforamtion into the modal
function writeModalStats(){
  const timeStat = document.querySelector('.modal__time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal__moves');
  const starsStat = document.querySelector('.modal__stars');
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves =${moves}`;
  starsStat.innerHTML = `stars =${stars}`;
}
document.querySelector('.modal__cancel').addEventListener('click', () =>{
  toggleModal();
});
document.querySelector('.modal__replay').addEventListener('click', () =>{
 resetGame();
 toggleModal();

});
function resetGame(){

  openCards=[];
  matched =0;
  resetClockAndTime();
  resetMoves();
  resetStars();
  resetCards();
  shuffleDeck();


}
function resetClockAndTime(){
  stopClock();
  clockOff = true;
  time=0;
  displayTime();
}
function resetMoves(){
  moves=0;
  document.querySelector('.moves').innerHTML = moves;
}
function resetStars(){
  stars=0;
  const startList = document.querySelectorAll('.stars li');
  for(star of startList){
    star.style.display = 'inline';
  }
}
function resetCards(){
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards){
    card.className='card';
  }
}
document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.modal__replay').addEventListener('click', resetGame);
// compare the cards match to see wether all the cards matched or not
function checkWin(){
if (matched == TOTAL_PAIRS){
  gameOver();
}
}

function gameOver(){
  //initGame();
  toggleModal();
  stopClock();
  writeModalStats();
  resetGame();


}
