import "../App.css";

export default function Card({ question, answer, difficulty, QA, setQA }) {
  const toggleQA = () => {
    setQA((prevQA) => (prevQA + 1) % 2);
  };

  // Apply "clicked" class if QA is 1
  const cardClassName = `flip-card ${QA === 1 ? "clicked" : ""} ${difficulty}`;
  const cardFrontAndBack = `flip-card-${QA === 0 ? "front" : "back"} `;

  return (
    <div className={cardClassName} onClick={toggleQA}>
      <div className="flip-card-inner">
        <div className={cardFrontAndBack}>
          {QA === 0 ? <h2>{question}</h2> : null}
        </div>
        <div className={cardFrontAndBack}>
          {QA === 1 ? <h2>{answer}</h2> : null}
        </div>
      </div>
    </div>
  );
}
