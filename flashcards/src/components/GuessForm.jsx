import { useState, useEffect } from "react";

export default function GuessForm({
  answer,
  clicked,
  currStreak,
  setCurrStreak,
  longStreak,
  setLongStreak,
  isCorrect,
  setIsCorrect,
}) {
  const [guess, setGuess] = useState("");
  // check the guess
  const checkGuess = (e) => {
    e.preventDefault();
    if (clicked || guess !== answer) {
      setIsCorrect("false");
      if (currStreak > longStreak) {
        setLongStreak(currStreak);
      }
      setCurrStreak(0);
    } else {
      setIsCorrect("true");
      setCurrStreak(currStreak + 1);
    }
    setGuess('')
  };
  
  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  return (
    <>
      <div className="input-form">
        <h4>Guess the answer here</h4>
        <h5>{answer}</h5>
        <form onSubmit={checkGuess}>
          <input type="text" value={guess} onChange={handleInputChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
