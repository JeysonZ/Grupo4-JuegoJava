package com.example.juegoAdivinarNumero;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
public class GameController {

    private static final int MAX_ATTEMPTS = 3;
    private static Integer numberToGuess = null;
    private static Integer attempts = 0;

    @PostMapping("/start")
    public void startGame() {
        numberToGuess = (int) (Math.random() * 100) + 1; // Número entre 1 y 100
        attempts = 0;
    }

    @GetMapping("/guess")
    public String guessNumber(@RequestParam int guess) {
        if (numberToGuess == null) {
            return "Inicia el juego primero!";
        }

        attempts++;
        int attemptsLeft = MAX_ATTEMPTS - attempts;

        if (guess == numberToGuess) {
            numberToGuess = null;
            if (attemptsLeft == 1) {
                return "Felicitaciones! Número correcto. Tuviste aun: " + attemptsLeft + " intento restante";
            }
            return "Felicitaciones! Número correcto. Tuviste aun: " + attemptsLeft + " intentos restantes";
        } else if (attempts >= MAX_ATTEMPTS) {
            Integer temp = numberToGuess;
            numberToGuess = null;
            return "Fin del juego! El número era: " + temp;
        } else if (guess < numberToGuess) {
            return "Demasiado bajo! Intentos restantes: " + attemptsLeft;
        } else {
            return "Demasiado alto! Intentos restantes: " + attemptsLeft;
        }
    }

    @GetMapping("/attempts")
    public int getAttempts() {
        return attempts;
    }
}
