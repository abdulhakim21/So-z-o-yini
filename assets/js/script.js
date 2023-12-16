const hangmanImg = document.querySelector('.hangman-box img')
const worldDisplay = document.querySelector('.word-display')
const guessesText = document.querySelector('.guesses-text b')
const keyboardDiv = document.querySelector('.keyboard')
const gameModal = document.querySelector('.game-modal')
const playAgain = document.querySelector('.play-again')

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const restGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    worldDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    hangmanImg.src = `assets/img/hangman-${wrongGuessCount}.svg`
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove('show');
}

const getRandomWorld = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    restGame()
    document.querySelector('.hint-text b').innerText = hint;
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Your fr` : `th birnimala`;
        gameModal.querySelector('img').src = `assets/img/${isVictory ? 'victory' : 'Lost'}.gif`;
        gameModal.querySelector('h4').innerText = `${isVictory ? 'Congres' : 'Game Over!'}.gif`;
        gameModal.querySelector('img').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add('show');
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter)
                worldDisplay.querySelectorAll('li')[index].innerText = letter;
                worldDisplay.querySelectorAll('li')[index].classList.add('guessed')
            }
        }) 
    } else{
        wrongGuessCount++;
        hangmanImg.src = `assets/img/hangman-${wrongGuessCount}.svg`
    }
    
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

// Creat keyboard buttons and adding event listener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button')
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWorld();
playAgain.addEventListener("click", getRandomWorld)