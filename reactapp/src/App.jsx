// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import a CSS file for styling

function App() {
    const [quizzes, setQuizzes] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get('api/quiz')
            .then(response => {setQuizzes(response.data); setLoading(false);console.log(response.data);})
            .catch(error => {console.error('Error fetching data:', error); setLoading(false);});
    }, []);

    const handleAnswerSelect = (questionId, answerId) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answerId,
        }));
    };

    const handleSubmit = () => {
        // Process userAnswers, maybe send to the server for evaluation
        console.log('User Answers:', userAnswers);
        alert('Answers submitted!'); // Placeholder for actual submission logic
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app-container">
            <h1>Quizzes</h1>
            <div className="quizzes-container">
                {quizzes.map(quiz => (
                    <div key={quiz.id} className="quiz-card">
                        <h2>{quiz.name}</h2>
                        <ul>
                            {quiz.questions.map(question => (
                                <li key={question.id} className="question-card">
                                    <p>{question.questionText}</p>
                                    <ul>
                                        {question.answers.map(answer => (
                                            <li key={answer.id}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        onChange={() => handleAnswerSelect(question.id, answer.id)}
                                                    />
                                                    {answer.answerText}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Submit Answers
            </button>
        </div>
    );
}

export default App;
