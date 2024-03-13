import FuzzySet from "fuzzyset.js";
import "../App.css";
export default function GuessForm({
  answer,
  clicked,
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

    const fuzzySet = FuzzySet([answer.toLowerCase()]);
    const result = fuzzySet.get(guess.toLowerCase());

    if (clicked || !result || result[0][0] < 0.8) {
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
