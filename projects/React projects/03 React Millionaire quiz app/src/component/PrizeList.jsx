import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react';
import './priceList.css'
import FiftyFifty from './lifelines/FiftyFifty';
import PhoneAFriend from './lifelines/PhoneAFriend';
import AudiencePoll from './lifelines/AudiencePoll';

const PrizeList = ({ questionNumber, setEarned, setFiftyFiftyUsed, setAudiencePollUsed, setPhonoFriendUsed, fiftyFiftyUsed, audiencePollUsed, phonoFriendUsed, currentQuestion }) => {

  const [activeLifeline, setActiveLifeline] = useState(null);

  const moneyPyramid = useMemo(() =>
    [
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 300" },
      { id: 4, amount: "$ 500" },
      { id: 5, amount: "$ 1000" },
      { id: 6, amount: "$ 2000" },
      { id: 7, amount: "$ 4000" },
      { id: 8, amount: "$ 8000" },
      { id: 9, amount: "$ 16000" },
      { id: 10, amount: "$ 32000" },
      { id: 11, amount: "$ 64000" },
      { id: 12, amount: "$ 125000" },
      { id: 13, amount: "$ 250000" },
      { id: 14, amount: "$ 500000" },
      { id: 15, amount: "$ 1000000" },

    ].reverse()
    , [])



  useEffect(() => {
    if (questionNumber > 1) {
      // this is done on account of array being reversed, so element originally at index 1 is now at index 14
      setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount)
    }
  }, [questionNumber])

  const openLifeline = (lifelineType) => {
    setActiveLifeline(lifelineType);
  };

  const closeLifeline = () => {
    setActiveLifeline(null);
  };

  const handleFiftyFifty = () => {
    setFiftyFiftyUsed(true);
    console.log("50:50 lifeline used, two incorrect answers removed.");
  }

  const handlePhonoFriend = () => {
    setPhonoFriendUsed(true);
    console.log("Phone a Friend lifeline used.");
  }

  const handleAudiencePoll = () => {
    setAudiencePollUsed(true);
    console.log("Audience Poll lifeline used.");
  }

  return (
    <>
      <div className='w-1/4'>

        {/* three life lines buttons */}

        <div className="flex flex-col items-center justify-center gap-3 h-full p-3">
          <div className="lifeline-buttons">
            <button 
              className={`lifeline-btn ${fiftyFiftyUsed ? 'disabled' : ''}`}
              onClick={() => openLifeline('fifty-fifty')} 
              disabled={fiftyFiftyUsed}
              title="50:50 - Remove two wrong answers"
            >
              <span className="lifeline-icon">🎯</span>
              <span>50:50</span>
            </button>
            <button 
              className={`lifeline-btn ${phonoFriendUsed ? 'disabled' : ''}`}
              onClick={() => openLifeline('phone-friend')} 
              disabled={phonoFriendUsed}
              title="Phone a Friend - Get advice from a friend"
            >
              <span className="lifeline-icon">📞</span>
              <span>Phone</span>
            </button>
            <button 
              className={`lifeline-btn ${audiencePollUsed ? 'disabled' : ''}`}
              onClick={() => openLifeline('audience-poll')} 
              disabled={audiencePollUsed}
              title="Ask the Audience - See what the audience thinks"
            >
              <span className="lifeline-icon">👥</span>
              <span>Audience</span>
            </button>
          </div>

          <ul className='list-none w-2/3 p-[20px]'>
            {moneyPyramid.map(item => {
              return (<li key={item.id} className={questionNumber == item.id ? "moneyListItem active" : "moneyListItem"}>
                <span className='moneyListItemNumber'>{item.id}</span>
                <span className='moneyListItemAmount'>{item.amount}</span>
              </li>)
            })}
          </ul>
        </div>
        
        {/* Lifeline Modals */}
        <FiftyFifty
          isOpen={activeLifeline === 'fifty-fifty'}
          onClose={closeLifeline}
          onUse={handleFiftyFifty}
          used={fiftyFiftyUsed}
        />
        
        <PhoneAFriend
          isOpen={activeLifeline === 'phone-friend'}
          onClose={closeLifeline}
          onUse={handlePhonoFriend}
          used={phonoFriendUsed}
          currentQuestion={currentQuestion}
        />
        
        <AudiencePoll
          isOpen={activeLifeline === 'audience-poll'}
          onClose={closeLifeline}
          onUse={handleAudiencePoll}
          used={audiencePollUsed}
          currentQuestion={currentQuestion}
        />
      </div>
      {/*  */}
    </>
  )
}

PrizeList.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  setEarned: PropTypes.func.isRequired,
  setFiftyFiftyUsed: PropTypes.func.isRequired,
  setAudiencePollUsed: PropTypes.func.isRequired,
  setPhonoFriendUsed: PropTypes.func.isRequired,
  fiftyFiftyUsed: PropTypes.bool.isRequired,
  audiencePollUsed: PropTypes.bool.isRequired,
  phonoFriendUsed: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.object,
}

export default PrizeList
