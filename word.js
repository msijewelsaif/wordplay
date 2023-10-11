const words = ["apple", "banana", "cherry", "grape", "kiwi", "orange", "strawberry", "lemon", "watermelon", "pineapple","modify","candle","pipe","like","bridge","kite","content","learning","teach","cognitive","read","hello","friend"];
let currentWord, scrambledWord, score, wrongAttempts, correctAnswers, wordNumber;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function scrambleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function displayWord() {
    wordNumber++;
    currentWord = getRandomWord();
    scrambledWord = scrambleWord(currentWord);
    document.getElementById('scrambled-word').textContent = scrambledWord;
    document.getElementById('word-number').textContent = wordNumber;
    document.getElementById('user-input').value = ''; // Clear previous input
}

function checkWord() {
    const userGuess = document.getElementById('user-input').value.toLowerCase();
    document.getElementById('attempt-number').textContent = wrongAttempts + correctAnswers + 1;

    if (userGuess === currentWord) {
        document.getElementById('message').textContent = "Correct! You guessed the word.";
        score++;
        correctAnswers++;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('correct-sound').play();
        displayWord();
    } else {
        document.getElementById('message').textContent = "Incorrect. Try again!";
        document.getElementById('incorrect-sound').play();
        wrongAttempts++;

        if (wrongAttempts >= 3) {
            // Finish the game after 3 incorrect answers
            document.getElementById('message').textContent = `Game Over. Final Score: ${score}`;
            document.getElementById('check-button').disabled = true;
            document.getElementById('new-word-button').disabled = true;
        }

        document.getElementById('wrong-answers').textContent = wrongAttempts;
    }
}

function newWord() {
    if (wrongAttempts >= 3) {
        // If the game has finished, don't allow new words
        return;
    }
    document.getElementById('message').textContent = '';
    displayWord();
}

document.getElementById('check-button').addEventListener('click', checkWord);
document.getElementById('new-word-button').addEventListener('click', newWord);

wordNumber = 0;
wrongAttempts = 0;
correctAnswers = 0;
score = 0;
document.getElementById('score').textContent = `Score: ${score}`;
displayWord();
