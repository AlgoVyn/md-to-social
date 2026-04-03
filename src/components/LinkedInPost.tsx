import React from 'react';
import { Share2, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import './LinkedInPost.css';

interface LinkedInPostProps {
  contentHtml: string;
}

export const LinkedInPost: React.FC<LinkedInPostProps> = ({ contentHtml }) => {
  return (
    <div className="linkedin-post">
      <div className="post-header">
        <div className="profile-pic-placeholder"></div>
        <div className="post-meta">
          <div className="post-author">
            <span className="author-name">Jane Doe</span>
            <span className="connection-degree">• 1st</span>
          </div>
          <div className="author-headline">Content Creator at SocialBoost</div>
          <div className="post-time">Just now • 🌐</div>
        </div>
      </div>
      
      <div 
        className="post-content" 
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />

      <div className="post-footer">
        <button className="footer-action"><ThumbsUp size={16} /> Like</button>
        <button className="footer-action"><MessageSquare size={16} /> Comment</button>
        <button className="footer-action"><Share2 size={16} /> Repost</button>
        <button className="footer-action"><Send size={16} /> Send</button>
      </div>
    </div>
  );
};
