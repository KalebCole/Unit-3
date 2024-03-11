import { useState } from "react";

export default function GuessForm({ answer, clicked, currStreak, setCurrStreak, longStreak, setLongStreak, isCorrect, setIsCorrect }) {

    const [guess, setGuess] = useState('');
    // check the guess
    const checkGuess = (e) => {
        e.preventDefault();
        if(clicked || guess !== answer){
            setIsCorrect("False");
            if(currStreak > longStreak){
                setLongStreak(currStreak)
            }
        }
        else{
            setIsCorrect("True");
            setCurrStreak(currStreak + 1);
        }
        console.log(isCorrect)
    }
    const handleInputChange = (event) => {
        setGuess(event.target.value);
    }

    return(
        <>
        <div className="input-form">
            <h4>Guess the answer here</h4>
            <form onSubmit={checkGuess}>
                <input type="text" value={guess} onChange={handleInputChange}/>
            </form>
            <input type="submit" value="Submit" />
        </div>
        </>
    );

};