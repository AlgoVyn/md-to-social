import React from 'react';
import classNames from 'classnames';
import './StyleModal.css';

interface StyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  formatStyle: string;
  setFormatStyle: (style: string) => void;
}

export const StyleModal: React.FC<StyleModalProps> = ({ isOpen, onClose, formatStyle, setFormatStyle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Template & Style Settings</h2>
        
        <div className="style-options">
          <label className={classNames('style-option', { active: formatStyle === 'standard' })}>
            <input type="radio" value="standard" checked={formatStyle === 'standard'} onChange={() => setFormatStyle('standard')} />
            <div>
              <strong>Standard Professional</strong>
              <p>Default parsing for clean, readable posts.</p>
            </div>
          </label>

          <label className={classNames('style-option', { active: formatStyle === 'bullet-optimized' })}>
            <input type="radio" value="bullet-optimized" checked={formatStyle === 'bullet-optimized'} onChange={() => setFormatStyle('bullet-optimized')} />
            <div>
              <strong>Bullet Point Optimized</strong>
              <p>Converts lists to checkmarks for better engagement.</p>
            </div>
          </label>

          <label className={classNames('style-option', { active: formatStyle === 'bold-headers' })}>
            <input type="radio" value="bold-headers" checked={formatStyle === 'bold-headers'} onChange={() => setFormatStyle('bold-headers')} />
            <div>
              <strong>Bold Headers</strong>
              <p>Makes top-level headers extra bold.</p>
            </div>
          </label>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="close-btn">Done</button>
        </div>
      </div>
    </div>
  );
};
