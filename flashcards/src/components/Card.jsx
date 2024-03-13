import "../App.css";

export default function Card({ question, answer, difficulty, QA, updateOnCardClick }) {
  

  // Apply "clicked" class if QA is "answer"
  const cardClassName = `flip-card ${QA === "answer" ? "clicked" : ""} ${difficulty}`;
  const cardFrontAndBack = `flip-card-${QA === "question" ? "front" : "back"} `;

  return (
    <div className={cardClassName} onClick={updateOnCardClick}>
      <div className="flip-card-inner">
        <div className={cardFrontAndBack}>
          {QA === "question" ? <h2>{question}</h2> : null}
        </div>
        <div className={cardFrontAndBack}>
          {QA === "answer" ? <h2>{answer}</h2> : null}
        </div>
      </div>
    </div>
  );
}
