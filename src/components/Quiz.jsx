import { useState, useEffect, useRef } from "react";
import db from "../database/db.js";
import { Questions } from "../utils/questions.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";

const Quiz = () => {
    const navigate = useNavigate();
    const questions = Questions;
    const [currentQuestion, setCurrentQuestion] = useState(0); // State to track the current question index
    const [score, setScore] = useState(0); // State to track the user's score
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track the selected answer
    const [showFeedback, setShowFeedback] = useState(false); // State to show feedback after an answer is selected
    const [quizFinished, setQuizFinished] = useState(false); // State to check if the quiz is finished
    const [userInput, setUserInput] = useState(""); // State to track user input for text-based answers
    const [timeLeft, setTimeLeft] = useState(30); // State to track the time left for each question
    const [review, setReview] = useState([]); // State to track the review data
    const inputRef = useRef(null); // Reference to the input element
  const { user, setUser } = useAuth();


    useEffect(() => {
        if (timeLeft === 0) {
            handleAnswerClick(null); // Automatically handle answer click when time runs out
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1); // Decrease time left by 1 every second
        }, 1000);

        return () => clearInterval(timer); // Clear the timer when the component unmounts
    }, [timeLeft]);

    useEffect(() => {
        setTimeLeft(30); // Reset the timer for each new question
        if (inputRef.current) {
            inputRef.current.focus(); // Focus the input field when the question changes
        }
    }, [currentQuestion]);

    const handleAnswerClick = (option) => {
        setSelectedAnswer(option); // Set the selected answer
        setShowFeedback(true); // Show feedback

        const correctAnswer = questions[currentQuestion].answer;
        const takenTime = 30 - timeLeft;

        // Add review data for the current question
        setReview((prevReview) => [
            ...prevReview,
            {
                questionId: currentQuestion,
                question: questions[currentQuestion].question,
                options: questions[currentQuestion].options || [],
                correctAnswer,
                userAnswer: option,
                takenTime,
            },
        ]);

        if (option === correctAnswer) {
            setScore((prev) => prev + 1); // Increase score if the answer is correct
        }

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1); // Move to the next question
                setShowFeedback(false); // Hide feedback
                setSelectedAnswer(null); // Reset selected answer
                setUserInput(""); // Reset user input
            } else {
                setQuizFinished(true); // Set quiz as finished
            }
        }, 1000);
    };

    const handleInputSubmit = () => {
        handleAnswerClick(userInput); // Handle answer click for text-based answers
    };

    const finishQuiz = async () => {
        await db.quizHistory.add({ score, timestamp: Date.now(), review, email:user.email }); // Save quiz result and review to the database
    };

    return (
        <div className="quiz-container p-4 max-w-md mx-auto space-y-4">
            {!quizFinished ? (
                <>
                    {/* Display question number */}
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">
                                Question {currentQuestion + 1}/{questions.length}
                            </span>
                        </div>
                        {/* Display time left */}
                        <span className="text-lg font-bold">{timeLeft}s</span>
                    </div>
                    {/* Display current question */}
                    <h2 className="text-xl font-bold">
                        {questions[currentQuestion].question}
                    </h2>

                    {/* Display multiple choice options */}
                    <div className="options space-y-2">
                        {questions[currentQuestion].options &&
                        questions[currentQuestion].options.length > 0 ? (
                            questions[currentQuestion].options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={showFeedback}
                                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                                >
                                    {option}
                                </button>
                            ))
                        ) : (
                            /* Display input field for text-based answers */
                            <div>
                                <input
                                    type="text"
                                    value={userInput}
                                    placeholder="Enter your answer"
                                    onChange={(e) => setUserInput(e.target.value)}
                                    className="w-full py-2 px-4 border rounded"
                                    disabled={showFeedback}
                                    ref={inputRef} // Attach the ref to the input element
                                />
                                <button
                                    onClick={handleInputSubmit}
                                    disabled={showFeedback}
                                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer mt-2"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                    {showFeedback && (
                        /* Display feedback */
                        <p
                            className={`mt-2 text-lg ${
                                selectedAnswer === questions[currentQuestion].answer
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {selectedAnswer === questions[currentQuestion].answer
                                ? "Correct!"
                                : "Wrong!"}
                        </p>
                    )}
                </>
            ) : (
                // Display final score when quiz is finished
                <div>
                    <h2 className="text-xl font-bold">
                        Quiz Finished! Your Score: {score}
                    </h2>
                   <div className="">
                   <button
                        onClick={()=>{
                            finishQuiz()
                            navigate("/")
                        }}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4 cursor-pointer"
                    >
                        Go Back
                    </button>
                   </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
