import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

const PhoneAFriend = ({ isOpen, onClose, onUse, used, currentQuestion }) => {
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const friends = [
    'Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa'
  ];
  
  const generateAdvice = () => {
    if (!currentQuestion) return;
    
    setIsLoading(true);
    
    // Simulate calling a friend (random advice)
    setTimeout(() => {
      const randomFriend = friends[Math.floor(Math.random() * friends.length)];
      const confidence = Math.floor(Math.random() * 60) + 40; // 40-100% confidence
      
      // Give correct answer 70% of the time
      const isCorrect = Math.random() < 0.7;
      const suggestedAnswer = isCorrect 
        ? currentQuestion.correct_answer 
        : currentQuestion.answers[Math.floor(Math.random() * currentQuestion.answers.length)];
      
      setAdvice(
        `Hi! It's ${randomFriend} here. I think the answer is "${suggestedAnswer}". ` +
        `I'm about ${confidence}% confident in this answer. Good luck!`
      );
      setIsLoading(false);
    }, 3000);
  };

  const handleUse = () => {
    onUse();
    generateAdvice();
  };

  useEffect(() => {
    if (!isOpen) {
      setAdvice('');
      setIsLoading(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Phone a Friend"
      className="lifeline-modal"
    >
      <div className="lifeline-content">
        <div className="lifeline-icon">📞</div>
        <div className="lifeline-description">
          Call a friend who will try to help you with the current question.
        </div>
        
        {!used ? (
          <>
            {!advice && !isLoading && (
              <div className="modal-buttons">
                <button className="modal-btn modal-btn-primary" onClick={handleUse}>
                  Call Friend
                </button>
                <button className="modal-btn modal-btn-secondary" onClick={onClose}>
                  Cancel
                </button>
              </div>
            )}
            
            {isLoading && (
              <div className="lifeline-result">
                <div className="lifeline-icon">📱</div>
                Calling your friend... Please wait.
              </div>
            )}
            
            {advice && (
              <div className="lifeline-result">
                <strong>Friend's Advice:</strong><br/>
                {advice}
                <div className="modal-buttons">
                  <button className="modal-btn modal-btn-primary" onClick={onClose}>
                    Thank You!
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="lifeline-result">
            Phone a Friend has already been used in this game!
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PhoneAFriend;
