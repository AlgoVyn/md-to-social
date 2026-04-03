import React from 'react';
import { Draft } from '../hooks/useHistory';
import './HistoryModal.css';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  drafts: Draft[];
  onLoadDraft: (draft: Draft) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, drafts, onLoadDraft }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content history-modal">
        <div className="modal-header">
          <h2>Conversion History</h2>
          <button onClick={onClose} className="close-icon-btn">×</button>
        </div>
        
        <div className="history-list">
          {drafts.length === 0 ? (
            <p className="no-history">No drafts saved yet. Start typing to save!</p>
          ) : (
            drafts.map(draft => (
              <div key={draft.id} className="history-item">
                <div className="history-preview">
                  {draft.markdown.slice(0, 100) + (draft.markdown.length > 100 ? '...' : '')}
                </div>
                <div className="history-meta">
                  <span>{new Date(draft.updatedAt).toLocaleString()}</span>
                  <button onClick={() => { onLoadDraft(draft); onClose(); }} className="load-btn">
                    Load
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
