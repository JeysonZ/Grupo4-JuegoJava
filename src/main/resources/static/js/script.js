// script.js

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const guessButton = document.getElementById("guessButton");
    const guessInput = document.getElementById("guessInput");
    const attemptsRemaining = document.getElementById("attemptsRemaining");
    const attemptsCount = document.getElementById("attemptsCount");
    const result = document.getElementById("result");
    const resultMessage = document.getElementById("resultMessage");
    const gameStatus = document.getElementById("gameStatus");

    let attemptsLeft = 3;

    function startGame() {
        fetch("/game/start", {
            method: "POST"
        }).then(response => {
            if (response.ok) {
                gameStatus.style.display = "block";
                startButton.style.display = "none";
                restartButton.style.display = "none";
                result.style.display = "none";
                attemptsLeft = 3;
                attemptsCount.textContent = attemptsLeft;
            }
        });
    }

    function makeGuess() {
        const guess = parseInt(guessInput.value, 10);

        fetch(`/game/guess?guess=${guess}`)
            .then(response => response.text())
            .then(text => {
                if (text.includes("Fin del juego")) {
                    resultMessage.textContent = text;
                    result.style.display = "block";
                    gameStatus.style.display = "none";
                    startButton.style.display = "none";
                    restartButton.style.display = "block";
                } else {
                    attemptsLeft--;
                    attemptsCount.textContent = attemptsLeft;
                    if (attemptsLeft <= 0) {
                        resultMessage.textContent = "Fin del juego! El número era: " + text.split("El número era: ")[1];
                        result.style.display = "block";
                        gameStatus.style.display = "none";
                        startButton.style.display = "none";
                        restartButton.style.display = "block";
                    } else {
                        // Actualizar mensaje con el texto proporcionado por el servidor
                        resultMessage.textContent = text;
                    }
                }
            });
    }

    function restartGame() {
        fetch("/game/start", {
            method: "POST"
        }).then(response => {
            if (response.ok) {
                gameStatus.style.display = "block";
                restartButton.style.display = "none";
                result.style.display = "none";
                attemptsLeft = 3;
                attemptsCount.textContent = attemptsLeft;
            }
        });
    }

    startButton.addEventListener("click", startGame);
    guessButton.addEventListener("click", makeGuess);
    restartButton.addEventListener("click", restartGame);
});
