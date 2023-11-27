// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import a CSS file for styling

function App() {
    const [quizzes, setQuizzes] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    //selected quiz
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    //score
    const [score, setScore] = useState(null);



    useEffect(() => {
        axios.get('api/quiz/')
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
        // only allow submission if all questions have been answered
        const answeredQuestions = Object.keys(userAnswers);
        const totalQuestions = selectedQuiz.questions.map(question => question.id);
        const allQuestionsAnswered = answeredQuestions.length === totalQuestions.length;
        if (!allQuestionsAnswered) {
            return alert('Please answer all questions before submitting.');
        }
        // Process userAnswers, maybe send to the server for evaluation
        console.log('User Answers:', userAnswers);
        alert('Answers submitted!'); // Placeholder for actual submission logic
        // use selectedQuiz to get the correct answers
        // answer has isCorrect property
        const correctAnswers = selectedQuiz.questions.map(question => question.answers.find(answer => answer.isCorrect));
        // take only the answer id
        const correctAnswerIds = correctAnswers.map(answer => answer.id);

        console.log('Correct Answer Ids:', correctAnswerIds);

        // calculate score
        const score = Object.keys(userAnswers).reduce((acc, questionId) => {
            const isCorrect = correctAnswerIds.includes(userAnswers[questionId]);
            return isCorrect ? acc + 1 : acc;
        }, 0);
        // display score
        alert(`You scored ${score} out of ${totalQuestions.length}!`);
        setScore(`You scored ${score} out of ${totalQuestions.length}!`);

        // display score in the UI

    

        // if userAnswers === correctAnswerIds, +

        // compare userAnswers to correct answers
        // calculate score
        // display score
        

    };

    if (loading) {
        return <div>Loading...</div>;
    }



    // allow user to select one quiz
    if (!selectedQuiz) {
        return (
            <div className="app-container">
                <h1>Quizzes</h1>
                <div className="quizzes-container">
                    {quizzes.map(quiz => (
                        <div key={quiz.id} className="quiz-card">
                            <h2>{quiz.name}</h2>
                            <button className="submit-button" onClick={() => setSelectedQuiz(quiz)}>
                                Select Quiz
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        
        <div className="app-container">
            <h1>Quizzes</h1>
            {score != null && <h2>{score}</h2>}
            <div className="quizzes-container">
                
                    <div key={selectedQuiz.id} className="quiz-card">
                        <h2>{selectedQuiz.name}</h2>
                        <ul>
                            {selectedQuiz.questions.map(question => (
                                <li key={question.id} className="question-card">
                                    <p>{question.question}</p>
                                    <ul>
                                        {question.answers.map(answer => (
                                            <li key={answer.id}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        onChange={() => handleAnswerSelect(question.id, answer.id)}
                                                    />
                                                    {answer.answer}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                 
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Submit Answers
            </button>
        </div>
    );
}

export default App;
