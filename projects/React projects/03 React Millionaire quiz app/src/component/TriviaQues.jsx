import PropTypes from 'prop-types'
import { useState, useEffect } from "react"
import useSound from 'use-sound';
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"


const TriviaQues = ({ data, setStop, questionNumber, setQuestionNumber, fiftyFiftyUsed, setFiftyFiftyUsed }) => {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [className, setClassName] = useState("answer")

    const [visibleAnswers, setVisibleAnswers] = useState([]);

    // Sound effects
    // useSound is a custom hook that allows you to play sounds in React components
    const [letsPlay] = useSound(play)
    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)

    // useEffect(() => {
    //   letsPlay();
    // }, [letsPlay])




    useEffect(() => {
        const currentQuestion = data[questionNumber - 1];
        setQuestion(currentQuestion);
        if (currentQuestion) {
            setVisibleAnswers([...currentQuestion.answers]);
        }
    }, [data, questionNumber])

    const shuffle = (arr) => {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        if (fiftyFiftyUsed && question) {
            // Remove two incorrect answers
            const incorrectAnswers = question.answers.filter(answer => answer !== question.correct_answer);
            const answersToRemove = shuffle(incorrectAnswers).slice(0, 2);
            const reduced = question.answers.filter(answer => !answersToRemove.includes(answer));
            setVisibleAnswers(reduced);
        }
    }, [fiftyFiftyUsed, question])


    const delay = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration * 1000)
    }
    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassName("answer active");
        delay(3, () => setClassName(a == question.correct_answer ? "answer correct" : "answer wrong"))
        delay(5, () => {
            if (a == question.correct_answer) {
                correctAnswer()
                delay(1, () => {
                    setQuestionNumber(prev => prev + 1);
                    setSelectedAnswer(null)
                })
            } else {
                wrongAnswer()
                delay(1, () => {
                    setStop(true)
                })
            }
        })

    }
    const answerLabels = ['A', 'B', 'C', 'D'];
    
    return (
        <div className="trivia">
            <div className="question">
                <div className="question-text">{question?.question}</div>
            </div>
            <div className="answers">
                {visibleAnswers.map((answer, index) => (
                    <button
                        key={index}
                        className={selectedAnswer === answer ? className : "answer"}
                        onClick={() => handleClick(answer)}
                        disabled={!!selectedAnswer}
                        type="button"
                    >
                        <div className="answer-label">{answerLabels[index]}</div>
                        <div className="answer-text">{answer}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}
// className={item == question.correct_answer ? "answer correct" : "answer wrong"}

TriviaQues.propTypes = {
    data: PropTypes.array.isRequired,
    setStop: PropTypes.func.isRequired,
    questionNumber: PropTypes.number.isRequired,
    setQuestionNumber: PropTypes.func.isRequired,
    fiftyFiftyUsed: PropTypes.bool.isRequired,
    setFiftyFiftyUsed: PropTypes.func.isRequired,
}

export default TriviaQues
