import React from 'react';
import { LinkedInPost } from './LinkedInPost';
import 'highlight.js/styles/github.css';
import './LivePreview.css';

interface LivePreviewProps {
  contentHtml: string;
  platform: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ contentHtml, platform }) => {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <h2 className="preview-title">Live Preview</h2>
        <span className="preview-badge">{platform}</span>
      </div>
      <div className="preview-content">
        {platform === 'linkedin' ? (
          <LinkedInPost contentHtml={contentHtml} />
        ) : (
          <div className="unsupported-platform">Preview for {platform} not yet supported</div>
        )}
      </div>
    </div>
  );
};
