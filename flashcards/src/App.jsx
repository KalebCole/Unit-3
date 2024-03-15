import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import GuessForm from "./components/GuessForm";
import flashcards from "./assets/flashcards.json";
import { Button, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(flashcards);
  // const [guess, setGuess] = {
  //   guess: "",
  //   currStreak: 0,
  //   longestStreak: 0,
  //   isCorrect: "",
  //   answer: "",
  //   isClicked: false
  // }
  // question or answer of card (determines if clicked or not)
  const [QA, setQA] = useState("question");
  const [isClicked, setIsClicked] = useState(false);
  const [currStreak, setCurrStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  // this will update the input field background
  const [isCorrect, setIsCorrect] = useState("");
  const [guess, setGuess] = useState("");


  useEffect(() => {
    // Fetch flashcards data here and set it in state
    setCards(flashcards);
  }, []);

  const updateOnCardClick = () => {
    setQA((prevQA) => (prevQA === "question" ? "answer" : "question"));
    setIsClicked(true);
  };

  const goBackValidation = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // on click of this, set the input field to be an empty string
  const goForwardValidation = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    setQA("question"); // Reset to question side
    setIsClicked(false); // Reset to not clicked
  };

  const onClickMovingForward = () => {
    goForwardValidation();
    setIsCorrect("");
    setGuess("");
  };

  const shuffleCards = () => {
    setQA("question");
    setIsClicked(false);
    setGuess("");
    let newCards = [...cards];
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i) + 1;
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setCards(newCards);
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
          <h5>Number of Cards: {cards.length - 1}</h5>
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
                question={cards[currentIndex].question}
                answer={cards[currentIndex].answer}
                difficulty={cards[currentIndex].difficulty}
                QA={QA}
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
              answer={cards[currentIndex].answer}
              isClicked={isClicked}
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
