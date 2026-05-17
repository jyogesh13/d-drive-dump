import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

const AudiencePoll = ({ isOpen, onClose, onUse, used, currentQuestion }) => {
  const [pollResults, setPollResults] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  
  const generatePollResults = () => {
    if (!currentQuestion) return;
    
    setIsPolling(true);
    
    // Simulate audience polling
    setTimeout(() => {
      const correctIndex = currentQuestion.answers.findIndex(
        answer => answer === currentQuestion.correct_answer
      );
      
      // Generate poll results with bias toward correct answer
      const results = currentQuestion.answers.map((answer, index) => {
        let percentage;
        if (index === correctIndex) {
          // Correct answer gets 45-70% of votes
          percentage = Math.floor(Math.random() * 25) + 45;
        } else {
          // Distribute remaining percentage among wrong answers
          percentage = Math.floor(Math.random() * 20) + 5;
        }
        
        return {
          answer,
          percentage,
          label: String.fromCharCode(65 + index) // A, B, C, D
        };
      });
      
      // Normalize percentages to add up to 100%
      const totalPercentage = results.reduce((sum, result) => sum + result.percentage, 0);
      const normalizedResults = results.map(result => ({
        ...result,
        percentage: Math.round((result.percentage / totalPercentage) * 100)
      }));
      
      setPollResults(normalizedResults);
      setIsPolling(false);
    }, 4000);
  };

  const handleUse = () => {
    onUse();
    generatePollResults();
  };

  useEffect(() => {
    if (!isOpen) {
      setPollResults(null);
      setIsPolling(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ask the Audience"
      className="lifeline-modal"
    >
      <div className="lifeline-content">
        <div className="lifeline-icon">👥</div>
        <div className="lifeline-description">
          The studio audience will vote on what they think is the correct answer.
        </div>
        
        {!used ? (
          <>
            {!pollResults && !isPolling && (
              <div className="modal-buttons">
                <button className="modal-btn modal-btn-primary" onClick={handleUse}>
                  Poll Audience
                </button>
                <button className="modal-btn modal-btn-secondary" onClick={onClose}>
                  Cancel
                </button>
              </div>
            )}
            
            {isPolling && (
              <div className="lifeline-result">
                <div className="lifeline-icon">📊</div>
                Audience is voting... Please wait.
              </div>
            )}
            
            {pollResults && (
              <div className="lifeline-result">
                <strong>Audience Poll Results:</strong>
                <div className="audience-poll">
                  {pollResults.map((result, index) => (
                    <div key={index} className="poll-option">
                      <span style={{ minWidth: '20px' }}>{result.label}:</span>
                      <div className="poll-bar">
                        <div 
                          className="poll-fill" 
                          style={{ width: `${result.percentage}%` }}
                        >
                          {result.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="modal-buttons">
                  <button className="modal-btn modal-btn-primary" onClick={onClose}>
                    Continue
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="lifeline-result">
            Ask the Audience has already been used in this game!
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AudiencePoll;
