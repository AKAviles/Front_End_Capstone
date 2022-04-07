import React, { useState, useEffect } from "react";
import {
  getQuestions,
  updateQuestion,
  deleteQuestion,
  addQuestion,
  addAnswerToQuestion,
  deleteAnswerToQuestion,
} from "../../utils/apiCalls";
import Logout from "../UserDashboardComponents/Logout";
import AdminNav from "./AdminNav";
import AnswersList from "./AnswersList";
import "../../css/app.css";
import "../../css/dashboard.css";
import "../../css/myQuotes.css";
import "../../css/Admin/qanda.css";

export default function QandA() {
  const [questionList, setQuestionList] = useState([]);
  const [resStatus, setResStatus] = useState(false);

  useEffect(() => {
    getAllQuestions();
  }, [questionList]);

  async function getAllQuestions() {
    try {
      const response = await getQuestions();
      setQuestionList(response.data);
      if (response.status === 200) {
        setResStatus(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='dashboard-body'>
      <div className='header'>
        <AdminNav />
        <Logout />
      </div>
      <div className='admin-dashboard-body'>
        <div className='qanda-container'>
          <table>
            <thead>
              <tr>
                <th>Question Id</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resStatus
                ? questionList.map((ques) => (
                    <tr key={ques.id}>
                      <td>{ques.questionId}</td>
                      <td>{ques.question}</td>
                      <td>
                        <AnswersList answerList={ques.answers} />
                      </td>
                      <td>Actions</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
