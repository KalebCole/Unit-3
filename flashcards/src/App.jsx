import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import GuessForm from "./components/GuessForm";
import flashcards from "./assets/flashcards.json";
import { Button, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cardsState, setCardsState] = useState({
    currentIndex: 0,
    QA: "question", 
    cards: flashcards, 
    difficulty: "",
    isClicked: false,
  });
  const [guessState, setGuessState] = useState({
    guess: "",
    currStreak: 0,
    longestStreak: 0,
    isCorrect: "",
  });

  const updateOnCardClick = () => {
    setCardsState((prev) => ({
      ...prev,
      QA: prev.QA === "question" ? "answer" : "question",
      isClicked: true,
    }));
  };

  const goBackValidation = () => {
    setCardsState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.currentIndex,
    }));
  };

  const goForwardValidation = () => {
    setCardsState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex < prev.cards.length - 1 ? prev.currentIndex + 1 : prev.currentIndex,
      QA: "question",
      isClicked: false,
    }));
  };


  const onClickMovingForward = () => {
    goForwardValidation();
    setGuessState((prev) => ({
      ...prev,
      guess: "",
      isCorrect: "",
    }));
  };

  const shuffleCards = () => {
    setCardsState((prev) => {
      let newCards = [...prev.cards];
      for (let i = newCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i) + 1;
        [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
      }
      // we are returning a new object with the same properties as the previous state
      // we do this because there is not a setState method for this object
      return {
        ...prev,
        cards: newCards,
        currentIndex: 1,  // Reset currentIndex to 1 becuase 0 is the title card
        QA: "question",
        isClicked: false,
      };
    });
  };

  return (
    <>
      <Container fluid className="background-container">
        <Row className="App-header mt-5 mb-4">
          <h1>ISYS366: E-Commerce Midterm Study Guide</h1>
        </Row>
        <Row>
          <h4>How much do you know about ASP.NET and Web Development??</h4>
          <h5>Number of Cards: {cardsState.cards.length - 1}</h5>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <h5>Current Streak: {guessState.currStreak}</h5>
            <h5>Longest Streak: {guessState.longestStreak}</h5>
          </Col>
          <Col></Col>
        </Row>

        <Row className="mt-4 mb-4">
          <Col></Col>
          <Col>
            {
              <Card
                question={cardsState.cards[cardsState.currentIndex].question}
                answer={cardsState.cards[cardsState.currentIndex].answer}
                difficulty={cardsState.cards[cardsState.currentIndex].difficulty}
                QA={cardsState.QA}
                updateOnCardClick={updateOnCardClick}
              />
            }
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col>
            <GuessForm
              answer={cardsState.cards[cardsState.currentIndex].answer}
              isClicked={cardsState.isClicked}
              currStreak={guessState.currStreak}
              setCurrStreak={(newStreak) => setGuessState((prev) => ({ ...prev, currStreak: newStreak }))}
              longStreak={guessState.longestStreak}
              setLongStreak={(newStreak) => setGuessState((prev) => ({ ...prev, longestStreak: newStreak }))}
              isCorrect={guessState.isCorrect}
              setIsCorrect={(isCorrect) => setGuessState((prev) => ({ ...prev, isCorrect }))}
              guess={guessState.guess}
              setGuess={(guess) => setGuessState((prev) => ({ ...prev, guess }))}
            ></GuessForm>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col className="Button-container">
            <Button
              className="backBtn"
              variant="outline-dark"
              onClick={goBackValidation}
            >
              <i className="bi bi-arrow-left"></i>
            </Button>
            <Button
              className="forwardBtn"
              variant="outline-dark"
              onClick={onClickMovingForward}
            >
              <i className="bi bi-arrow-right"></i>
            </Button>
            <Button
              className="shuffleBtn"
              variant="outline-dark"
              onClick={shuffleCards}
            >
              Shuffle Cards
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
