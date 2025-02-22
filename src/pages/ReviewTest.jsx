import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import db from "../database/db";
import { FaArrowLeft } from "react-icons/fa";

const ReviewTest = () => {
  const [history, setHistory] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log({ history });
  }, [history]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await db.quizHistory.toArray();
      const thisRecord = data.find((record) => record.id === parseInt(id));
      console.log({ id, thisRecord });

      setHistory(thisRecord);
    };
    fetchHistory();
  }, []);

  //   const h = {
  //     score: 5,
  //     timestamp: 1740174189299,
  //     review: [
  //       {
  //         questionId: 0,
  //         question: "Which planet is closest to the Sun?",
  //         options: ["Venus", "Mercury", "Earth", "Mars"],
  //         correctAnswer: "Mercury",
  //         userAnswer: "Mercury",
  //         takenTime: 1,
  //       },
  //       {
  //         questionId: 1,
  //         question:
  //           "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
  //         options: ["Stack", "Queue", "Tree", "Graph"],
  //         correctAnswer: "Queue",
  //         userAnswer: "Queue",
  //         takenTime: 0,
  //       },
  //       {
  //         questionId: 2,
  //         question:
  //           "Which of the following is primarily used for structuring web pages?",
  //         options: ["Python", "Java", "HTML", "C++"],
  //         correctAnswer: "HTML",
  //         userAnswer: "HTML",
  //         takenTime: 0,
  //       },
  //       {
  //         questionId: 3,
  //         question: "Which chemical symbol stands for Gold?",
  //         options: ["Au", "Gd", "Ag", "Pt"],
  //         correctAnswer: "Au",
  //         userAnswer: "Au",
  //         takenTime: 0,
  //       },
  //       {
  //         questionId: 4,
  //         question:
  //           "Which of these processes is not typically involved in refining petroleum?",
  //         options: [
  //           "Fractional distillation",
  //           "Cracking",
  //           "Polymerization",
  //           "Filtration",
  //         ],
  //         correctAnswer: "Filtration",
  //         userAnswer: "Filtration",
  //         takenTime: 1,
  //       },
  //       {
  //         questionId: 5,
  //         question: "What is the value of 12 + 28?",
  //         options: [],
  //         correctAnswer: "40",
  //         userAnswer: "4534",
  //         takenTime: 1,
  //       },
  //       {
  //         questionId: 6,
  //         question: "How many states are there in the United States?",
  //         options: [],
  //         correctAnswer: "50",
  //         userAnswer: "345",
  //         takenTime: 0,
  //       },
  //       {
  //         questionId: 7,
  //         question: "In which year was the Declaration of Independence signed?",
  //         options: [],
  //         correctAnswer: "1776",
  //         userAnswer: "345",
  //         takenTime: 1,
  //       },
  //       {
  //         questionId: 8,
  //         question: "What is the value of pi rounded to the nearest integer?",
  //         options: [],
  //         correctAnswer: "3",
  //         userAnswer: "453",
  //         takenTime: 1,
  //       },
  //       {
  //         questionId: 9,
  //         question:
  //           "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
  //         options: [],
  //         correctAnswer: "120",
  //         userAnswer: "345",
  //         takenTime: 1,
  //       },
  //     ],
  //     id: 17,
  //   };

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="min-h-screen flex flex-col items-center py-10 p-4 md:px-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between  mb-8 w-full ">
          <div className="flex items-center justify-center p-2 cursor-pointer border-2 border-gray-700 rounded-full" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </div>
          <h1 className="text-4xl font-bold hidden md:block">Interactive Quiz Platform</h1>
          <div className=""></div>
        </div>
        <div className="mb-6 bg-white p-8 rounded-lg shadow-md w-full ">
          <h2 className="text-2xl font-bold mb-4">Quiz Details</h2>
          <h2 className="text-xl font-semibold">Score: {history?.score} </h2>
          <h2 className="text-xl font-semibold">
            Date: {new Date(history?.timestamp).toLocaleString()}{" "}
          </h2>
        </div>

        <div className=" ">
          {history &&
            history?.review.map((question, index) => (
              <div
                key={question.questionId}
                className="mb-6 bg-white p-8 rounded-lg shadow-md w-full "
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold">
                    Question {index + 1}/{history?.review?.length}
                  </span>

                  <span className="text-lg font-bold">
                    {question?.takenTime}s
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-4">{question?.question}</h2>

                <div className="options space-y-2">
                  {question?.options && question?.options.length > 0 ? (
                    question.options.map((option) => (
                      <button
                        key={option}
                        disabled={true}
                        className={`w-full py-2 px-4 ${
                          question.userAnswer === option
                            ? option === question.correctAnswer
                              ? "bg-green-500"
                              : "bg-red-500"
                            : ""
                        }  bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer`}
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <div className="text-lg font-bold">
                      {question.userAnswer === question.correctAnswer ? (
                        <span className="text-green-500">
                          {question.correctAnswer}
                        </span>
                      ) : (
                        <span className="text-red-500">
                          {question.userAnswer}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="">
                    <p className="text-md font-semibold">
                      Correct Answer: {question.correctAnswer}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewTest;
