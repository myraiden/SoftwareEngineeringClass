const gameContainer = document.getElementById("game");
const h1Header=document.querySelector('h1');
const startGame=document.querySelector('#startButton');
const resetGame=document.querySelector('#resetButton');
const currentScore=document.querySelector('#scoreBoard');
const showBestScore=document.querySelector('#bestScoreVal');
const numberOfCards=document.querySelector('#numberOfCards');


//old code that defined the colors users could select
/* const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
]; */

//an empty array so the card options can be set in JS
let COLORS=[];

//some more global variables
let matchesPossible=0;
let matchesCompleted=0;
let score=0;
let bestScore=JSON.parse(localStorage.getItem('memorygameBestScore'));

//this function generates a single color and passes back
//  the color both as a rgb value and a hex value
function generateColor(){
  red=Math.floor(Math.random()*255);
  blue=Math.floor(Math.random()*255);
  green=Math.floor(Math.random()*255);

  let rgbString=`rgb(${red.toString()},${blue},${green})`;
  let redHex=red.toString(16);
  let blueHex=red.toString(16);
  let greenHex=red.toString(16);
  let finalHex=`#${redHex}${greenHex}${blueHex}`
  return [rgbString,finalHex];
  
}
//new code that allows the user to set the number of cards to select
//  and then fills out the card values using either images or colors
//   depending on user choice
function generateCardArray(number){
    //RGB is in the format of (RRR, GGG, BBB) with a range of 0-255 for each value
    //generate a random value between 0-255
    //and save it twice into the array
    for(let m=0; m<parseInt(number); m++){
      let getColor=generateColor().toString();
      COLORS[m]=getColor.toString();
      COLORS[parseInt(number)+m]=getColor.toString();
    };
}

//handling when the user wishes to start a new game
resetGame.addEventListener('click',function(e){
  while(gameContainer.firstChild){
    gameContainer.removeChild(gameContainer.firstChild);
  }
  matchesCompleted=0;
  score=0;
  h1Header.innerText='Memory Game!';

  // when the DOM loads
  COLORS=[];
    //get how the user wants the name of the color to display 
  generateCardArray(numberOfCards.value);
  matchesPossible=COLORS.length/2;
  //show the best score
  if(bestScore[matchesPossible]===undefined){
    showBestScore.value='';
  }else{
    showBestScore.value=parseInt(bestScore[matchesPossible]);
  }

  //shuffle the colors
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  currentScore.value=score;
 
})

//this is an empty array to handle two selections
//  and an initialized counter to handle selecting two items
let selectSet = ['',''];
k=0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}



// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray,codeType) {
  for (let color of colorArray) {
    //parse the string as an array
    let stringColor=color.split('),');
    stringColor[0]+=')';
    // create a new div
    const newDiv = document.createElement("div");

    // give it a special data atribute
    if(codeType==='noCode'){
      newDiv.classList.add(stringColor[0]);
    } else if(codeType==='rgbCode'){
      newDiv.classList.add(stringColor[0]);
      newDiv.setAttribute('data-colorCode',stringColor[0]);
    }else{
      //let tempColor=color.substring(1,color.length-1);
      newDiv.classList.add(stringColor[0]);
      newDiv.setAttribute('data-colorCode', stringColor[1])
    }

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//handling matched items
function matchLock(matchedItem){
  matchedItem.classList.toggle('matched');
  matchedItem.style.pointerEvents='none';
  matchedItem.style.transform='none';
}

//handling items that don't match
function noMatchReset(noMatch){
  noMatch.classList.toggle('selected');
  noMatch.innerHTML='';
  noMatch.style.backgroundColor='';
}

//handling when the game has been won and checking for a best score
//  given the number of cards the user has decided to play with
function gameIsWon(){
  //get best score for that number of cards
  let cardNoBestScore=bestScore[matchesPossible];
  if(score<cardNoBestScore || cardNoBestScore===null || cardNoBestScore===undefined){
    bestScore[matchesPossible]=score;
    localStorage.setItem('memorygameBestScore',JSON.stringify(bestScore));
  }
  h1Header.append(' - You Won!');
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);

  let displayCode=document.querySelector('input[name=showColorCode]:checked');
  let classColor='';
  //get the class of the DIV that has been clicked
  classColor=event.target.className;
  
  //set the state of the item to selected
  event.target.classList.toggle('selected');
  
  if(event.target.classList.contains('matched')){
    //do nothing
  }else{
    //otherwise start to handle the event
    //change the square to the color of the clicked item
    if (event.target.classList.contains('selected')){
      event.target.style.backgroundColor=classColor;

      if(displayCode.value==='hexCode'){
        let hexValue=event.target.dataset.colorcode;
        event.target.innerText=hexValue;
      }else if(displayCode.value==='rgbCode'){
        event.target.innerText=classColor;
      }else{
        //no inner text
        event.target.innerText='';
      }
      selectSet[k]=event.target;
      k+=1;
    }else{
      //or change it back to white if it's un-clicked
      event.target.style.backgroundColor='';
      event.target.innerHTML='';
      selectSet[k]='';
      k-=1;
    }

    //handling when we reach two selected cards
    //  this also pauses the user's ability to select cards while
    //  the code runs so users can't flip more than 2 cards at a time
    if(k>=2){
      //imcrement the score and save to memory
      score+=1;
      currentScore.value=score;

      //if the class names match we have a match
      if(selectSet[0].className===selectSet[1].className){
        gameContainer.style.pointerEvents='none';
        setTimeout(()=>{
          matchLock(selectSet[0]);
          matchLock(selectSet[1]);
          k=0;
          gameContainer.style.pointerEvents='auto';
        },1000);
        matchesCompleted+=1;
      //if the class names don't match then we should reset those two cards
      }else{
        gameContainer.style.pointerEvents='none';
        setTimeout(() => {
          k=0;
          noMatchReset(selectSet[0]);
          noMatchReset(selectSet[1]);
          gameContainer.style.pointerEvents='auto';
        },1000);
      }
      
    }
  }
  
  //check to see if everything has been matched, if it has, tell the user
  if(matchesCompleted>=matchesPossible){
    gameIsWon();
  }
  
}