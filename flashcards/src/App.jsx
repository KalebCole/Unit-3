

import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import GuessForm from "./components/GuessForm";
import flashcards from "./assets/flashcards.json";
import start from "./assets/start.json";
import { Button, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // question or answer of card (determines if clicked or not)
  const [QA, setQA] = useState(0);
  // used for previous card
  const [previousIndex, setPreviousIndex] = useState(null);
  const [showStartCard, setShowStartCard] = useState(true);
  const [currStreak, setCurrStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  // this will update the input field background
  const[isCorrect, setIsCorrect] = useState('')

  const goBackValidation = () => {
    if (previousIndex !== null) {
      setCurrentIndex(previousIndex);
      setPreviousIndex(null);
    }
  };

  // on click of this, set the input field to be an empty string
  const goForwardValidation = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    } while (randomIndex === currentIndex);
    setPreviousIndex(currentIndex);
    setCurrentIndex(randomIndex);
    setQA(0); // Reset to question side
  };

  const startFlashcards = () => {
    setShowStartCard(false);
  };
  return (
    <>
      <Container fluid className="background-container">
        <Row className="App-header mt-5 mb-4">
          <h1>ISYS366: E-Commerce Midterm Study Guide</h1>
        </Row>
        <Row>
          <h4>How much do you know about ASP.NET and Web Development??</h4>
          <h5>Number of Cards: {flashcards.length}</h5>
        </Row>

        <Row className="mt-4 mb-4">
          <Col></Col>
          <Col>
            {showStartCard === false ? (
              <Card
                question={flashcards[currentIndex].question}
                answer={flashcards[currentIndex].answer}
                difficulty={flashcards[currentIndex].difficulty}
                QA={QA}
                setQA={setQA}
              />
            ) : (
              <Card
                question={start.question}
                answer={start.answer}
                QA={QA}
                setQA={setQA}
              />
            )}
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col>
            <GuessForm
              answer={showStartCard ? start.answer : flashcards[currentIndex].answer}
              clicked={QA}
              currStreak={currStreak}
              setCurrStreak={setCurrStreak}
              longStreak={longestStreak}
              setLongStreak={setLongestStreak}
              isCorrect={isCorrect}
              setIsCorrect={setIsCorrect}
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
              onClick={() => {
                goForwardValidation();
                startFlashcards();
              }}
            >
              <i className="bi bi-arrow-right"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
