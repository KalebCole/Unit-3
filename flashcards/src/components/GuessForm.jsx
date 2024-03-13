import FuzzySet from "fuzzyset.js";
import "../App.css";
export default function GuessForm({
  answer,
  isClicked,
  currStreak,
  setCurrStreak,
  longStreak,
  setLongStreak,
  isCorrect,
  setIsCorrect,
  guess,
  setGuess,
}) {
  // check the guess
  const checkGuess = (e) => {
    e.preventDefault();

    const answerPhrases = answer.toLowerCase().split(", ");
    const guessPhrases = guess.toLowerCase().split(", ");

    let matchCount = 0;
    for (let guessPhrase of guessPhrases) {
      const fuzzySet = FuzzySet(answerPhrases);
      const result = fuzzySet.get(guessPhrase);
      if (result && result[0][0] >= 0.8) {
        matchCount++;
      }
    }
    if (isClicked) {
      return;
    }
    if (matchCount / answerPhrases.length < 0.8) {
      // 0.8 is the threshold for a match
      setIsCorrect("false");
      if (currStreak > longStreak) {
        setLongStreak(currStreak);
      }
      setCurrStreak(0);
    } else {
      setIsCorrect("true");
      setCurrStreak(currStreak + 1);
    }
  };

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  return (
    <>
      <div className="input-form">
        <h4>Guess the answer here</h4>
        <form onSubmit={checkGuess}>
          <input
            type="text"
            className={
              isCorrect == "true"
                ? "correct"
                : isCorrect == "false"
                ? "incorrect"
                : null
            }
            value={guess}
            onChange={handleInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
