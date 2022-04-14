import React, { useState } from "react";
import {
  addAnswerToQuestion,
  deleteAnswerToQuestion,
} from "../../utils/apiCalls";

export default function AnswerList({ clickState, ques }) {
  const [addAnswerClicked, setAddAnswerClicked] = useState(false);
  const [answerData, setAnswerData] = useState({ answer: "" });
  return (
    <div
      className={`${
        parseInt(clickState) === ques.questionId ? "answers-list" : "hidden"
      }`}
    >
      {ques.answers.map((ans) => (
        <ul className='answers-list' key={ans.answerId}>
          <span className='answers-list'>{ans.answer}</span>
          <span>&#215;</span>
        </ul>
      ))}
      <span
        className='add'
        onClick={() => setAddAnswerClicked(!addAnswerClicked)}
      >
        &#43;
      </span>
      {addAnswerClicked ? <input></input> : null}
    </div>
  );
}
