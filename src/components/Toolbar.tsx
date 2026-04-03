import React from 'react';
import { Settings, Copy, Monitor, Clock } from 'lucide-react';
import './Toolbar.css';

interface ToolbarProps {
  onCopy: () => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  platform: string;
  setPlatform: (val: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onCopy, onOpenSettings, onOpenHistory, platform, setPlatform }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-logo">
        <Monitor className="logo-icon" />
        <span className="logo-text">MDtoSocial</span>
      </div>
      
      <div className="toolbar-actions">
        <select 
          value={platform} 
          onChange={(e) => setPlatform(e.target.value)}
          className="platform-select"
        >
          <option value="linkedin">LinkedIn</option>
          {/* Twitter and others can be added in future */}
        </select>

        <button className="action-button" onClick={onOpenHistory} title="Conversion History">
          <Clock size={18} />
          <span>History</span>
        </button>

        <button className="action-button" onClick={onOpenSettings} title="Style Settings">
          <Settings size={18} />
          <span>Styles</span>
        </button>

        <button className="action-button primary" onClick={onCopy} title="Copy to Clipboard">
          <Copy size={18} />
          <span>Copy</span>
        </button>
      </div>
    </div>
  );
};
