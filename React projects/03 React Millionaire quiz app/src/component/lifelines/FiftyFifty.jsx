import React from 'react';
import Modal from '../Modal';

const FiftyFifty = ({ isOpen, onClose, onUse, used }) => {
  const handleUse = () => {
    onUse();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="50:50 Lifeline"
      className="lifeline-modal"
    >
      <div className="lifeline-content">
        <div className="lifeline-icon">🎯</div>
        <div className="lifeline-description">
          The computer will eliminate two incorrect answers, leaving you with the correct answer and one wrong answer.
        </div>
        
        {!used ? (
          <div className="modal-buttons">
            <button className="modal-btn modal-btn-primary" onClick={handleUse}>
              Use 50:50
            </button>
            <button className="modal-btn modal-btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="lifeline-result">
            50:50 has already been used in this game!
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FiftyFifty;
