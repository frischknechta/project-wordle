import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

import GuessInput from "../GuessInput/GuessInput";
import GuessesList from "../GuessesList/GuessesList";
import WinBanner from "../WinBanner/WinBanner";
import LoseBanner from "../LoseBanner/LoseBanner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [status, setStatus] = React.useState("running");

  function addGuess(guess) {
    let newGuesses = [...guesses, guess];

    setGuesses(newGuesses);

    if (guess === answer) {
      setStatus("win");
    } else if (newGuesses.length === NUM_OF_GUESSES_ALLOWED) {
      setStatus("lose");
    }
  }

  return (
    <>
      <GuessesList guesses={guesses} answer={answer} />
      <GuessInput addGuess={addGuess} />
      {status === "win" && <WinBanner numOfGuesses={guesses.length} />}
      {status === "lose" && <LoseBanner answer={answer} />}
    </>
  );
}

export default Game;
