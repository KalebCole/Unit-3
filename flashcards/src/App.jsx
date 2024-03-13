import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import GuessForm from "./components/GuessForm";
import flashcards from "./assets/flashcards.json";
import { Button, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // question or answer of card (determines if clicked or not)
  const [QA, setQA] = useState(0);
  const [currStreak, setCurrStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  // this will update the input field background
  const [isCorrect, setIsCorrect] = useState("");
  const [guess, setGuess] = useState("");
  // const [flashcards, setFlashcards] = useState([...flashcards]);
  // const [masteredCards, setMasteredCards] = useState([]);

  // const handleCorrectGuess = (card) => {
  //   // Add the card to the masteredCards array
  //   setMasteredCards([...masteredCards, card]);

  //   // Remove the card from the flashcards array
  //   setFlashcards(flashcards.filter((flashcard) => flashcard !== card));
  // };
  const goBackValidation = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // on click of this, set the input field to be an empty string
  const goForwardValidation = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    setQA(0); // Reset to question side
  };

  const shuffleCards = () => {
    for (let i = flashcards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)) + 1;
      [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }
    setCurrentIndex(1);
  };

  return (
    <>
      <Container fluid className="background-container">
        <Row className="App-header mt-5 mb-4">
          <h1>ISYS366: E-Commerce Midterm Study Guide</h1>
        </Row>
        <Row>
          <h4>How much do you know about ASP.NET and Web Development??</h4>
          <h5>Number of Cards: {flashcards.length - 1}</h5>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <h5>Current Streak: {currStreak}</h5>
            <h5>Longest Streak: {longestStreak}</h5>
          </Col>
          <Col></Col>
        </Row>

        <Row className="mt-4 mb-4">
          <Col></Col>
          <Col>
            {
              <Card
                question={flashcards[currentIndex].question}
                answer={flashcards[currentIndex].answer}
                difficulty={flashcards[currentIndex].difficulty}
                QA={QA}
                setQA={setQA}
              />
            }
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col>
            <GuessForm
              answer={flashcards[currentIndex].answer}
              clicked={QA}
              currStreak={currStreak}
              setCurrStreak={setCurrStreak}
              longStreak={longestStreak}
              setLongStreak={setLongestStreak}
              isCorrect={isCorrect}
              setIsCorrect={setIsCorrect}
              guess={guess}
              setGuess={setGuess}
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
                setIsCorrect("");
                setGuess("");
              }}
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
