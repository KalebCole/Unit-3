import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import flashcards from "./assets/flashcards.json";
import start from "./assets/start.json";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [QA, setQA] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [showStartCard, setShowStartCard] = useState(true);

  const goBackValidation = () => {
    if (previousIndex !== null) {
      setCurrentIndex(previousIndex);
      setPreviousIndex(null);
    }
  };

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
