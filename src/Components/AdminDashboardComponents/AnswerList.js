import React, { useState } from "react";
import {
  addAnswerToQuestion,
  deleteAnswerToQuestion,
} from "../../utils/apiCalls";

export default function AnswerList({ clickState, ques }) {
  const [addAnswerClicked, setAddAnswerClicked] = useState(false);
  const [answerData, setAnswerData] = useState({ answer: "" });

  function handleAnswerInput({ target }) {
    setAnswerData({
      ...answerData,
      answer: target.value,
    });
  }

  function handleAnswerAdd(e, id) {
    if (e.key === "Enter") {
      addAnswerToQuestion(answerData, id);
      setAnswerData({
        answer: "",
      });
    }
  }

  return (
    <div
      key={ques.questionId}
      className={`${
        parseInt(clickState) === ques.questionId ? "answers-list" : "hidden"
      }`}
    >
      {ques.answers.map((ans) => (
        <ul className='answers-list' key={ans.answerId}>
          <span className='answers-list'>{ans.answer}</span>
          <button
            onClick={() =>
              deleteAnswerToQuestion(ques.questionId, ans.answerId)
            }
          >
            &#215;
          </button>
        </ul>
      ))}
      <span
        className='add'
        onClick={() => setAddAnswerClicked(!addAnswerClicked)}
      >
        &#43;
      </span>
      {addAnswerClicked ? (
        <input
          key={ques.questionId}
          value={answerData.answer}
          placeholder='Answer'
          onChange={(e) => handleAnswerInput(e)}
          onKeyDown={(e) => handleAnswerAdd(e, ques.questionId)}
        ></input>
      ) : null}
    </div>
  );
}
