import React from "react";
import { LinkedInPost } from "./LinkedInPost";
import "highlight.js/styles/github.css";
import "./LivePreview.css";

interface LivePreviewProps {
  contentText: string;
  platform: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  contentText,
  platform,
}) => {
  return (
    <section 
      className="preview-container" 
      aria-label="Live preview"
      aria-live="polite"
    >
      <div className="preview-header">
        <h2 className="preview-title" id="preview-heading">Live Preview</h2>
        <span className="preview-badge" aria-label={`Platform: ${platform}`}>
          {platform}
        </span>
      </div>
      <div 
        className="preview-content" 
        role="region" 
        aria-labelledby="preview-heading"
      >
        {platform === "linkedin" ? (
          <LinkedInPost contentText={contentText} />
        ) : (
          <div className="unsupported-platform" role="status">
            Preview for {platform} not yet supported
          </div>
        )}
      </div>
    </section>
  );
};
