import { useState, useEffect } from 'react'
import './App.css'
import PrizeList from './component/PrizeList'
import TriviaQues from './component/TriviaQues'
import Timer from './component/Timer'
import Start from './component/Start'

function App() {
  const [userName, setUserName] = useState('yogesh')

  const [questionNumber, setQuestionNumber] = useState(1)
  const [data, setData] = useState([])
  const [stop, setStop] = useState(false)
  const [earned, setEarned] = useState("$ 0")

  //lifelines
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false)
  const [phonoFriendUsed, setPhonoFriendUsed] = useState(false)
  const [audiencePollUsed, setAudiencePollUsed] = useState(false)

  // Fetching trivia questions from the API
  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=15&difficulty=medium&type=multiple"
    const fetchData = async () => {
      const res = await fetch(url)
      const quesData = await res.json()
      const questions = quesData.results.map(item => {
        return {
          id: quesData.results.indexOf(item),
          question: item["question"],
          answers: [...item["incorrect_answers"], item["correct_answer"]],
          correct_answer: item["correct_answer"],
        }
      })
      setData(questions);
    }
    fetchData()
  }, [])

  console.log(data)

  return (
    <>
      <div className="app">
        {userName ? (
          <>
            <div className="main">
              {stop ? <div className='earning'><h1>You Earned: {earned}</h1></div> : (
                <>

                  <div className="top">
                    {/* <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber} /></div> */}
                  </div>
                  <div className="bottom">
                    <TriviaQues
                      data={data}
                      setStop={setStop}
                      setQuestionNumber={setQuestionNumber}
                      questionNumber={questionNumber}
                      fiftyFiftyUsed={fiftyFiftyUsed}
                      setFiftyFiftyUsed={setFiftyFiftyUsed}
                    />
                  </div>
                </>
              )}
            </div>
            <PrizeList
              questionNumber={questionNumber}
              setEarned={setEarned}
              setFiftyFiftyUsed={setFiftyFiftyUsed}
              setAudiencePollUsed={setAudiencePollUsed}
              setPhonoFriendUsed={setPhonoFriendUsed}
              fiftyFiftyUsed={fiftyFiftyUsed}
              audiencePollUsed={audiencePollUsed}
              phonoFriendUsed={phonoFriendUsed}
              currentQuestion={data[questionNumber - 1]} />
          </>) : <Start setUserName={setUserName} />
        }

      </div>
      {/* <div></div> */}
    </>
  )
}

export default App
