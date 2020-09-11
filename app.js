//Game Values
let min = 1;
let max = 10;
let winningNum = getWinningNumber(min, max);
let guessLeft = 3;

//UI elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;
//Play Again Event Listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});
//Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < min || guess > max) {
    showMessage(`Please Enter the number between ${min} and ${max}`);
    //Change border color
    guessInput.style.borderColor='red';
    //Change Message color
    message.style.color='green';
    
  }
  //Check If win
  else if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, You Win!`);
  } else {
    guessLeft -= 1;
    if (guessLeft === 0) {
      gameOver(
        false,
        `Game Over,You Lost.The correct answer was ${winningNum}`
      );
    } else {
      //Game continues - answer wrong

      //Change border Color
      guessInput.style.borderColor = 'red';
      //Clear Input
      guessInput.value = '';
      //change message color
      message.style.color = 'red';
      //show Messgage
      showMessage(`${guess} is incorrect,${guessLeft} guess left`);
    }
  }
});

//Define GameOver Function
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  //Disabled Input
  guessInput.disabled = true;
  //Change Border Color
  guessInput.style.borderColor = color;
  //Change message Color
  message.style.color = color;
  //showMessage
  showMessage(msg);
  //play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}
//Get Winning Number
function getWinningNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//Define showMessage function
function showMessage(msg) {
  message.textContent = msg;
}
