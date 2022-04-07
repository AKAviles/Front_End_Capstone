import React, { useState } from "react";
import "../../css/Admin/qanda.css";

export default function AnswersList({ answerList }) {
  const [showList, setShowList] = useState(false);

  function handleListDisplay() {
    setShowList(!showList);
  }
  return (
    <>
      {showList ? (
        <>
          {answerList.map((ans) => (
            <ul className='answers-list' key={ans.answerId}>
              <span className='answers-list'>{ans.answer}</span>
            </ul>
          ))}
          <button onClick={() => handleListDisplay()}>Hide</button>
        </>
      ) : (
        <>
          {" "}
          <button onClick={() => handleListDisplay()}>Show Answers</button>
        </>
      )}
    </>
  );
}
