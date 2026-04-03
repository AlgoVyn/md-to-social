import { useState, useEffect } from 'react';

export interface Draft {
  id: string;
  markdown: string;
  updatedAt: number;
}

export function useHistory() {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('md-to-social-drafts');
    if (saved) {
      try {
        setDrafts(JSON.parse(saved));
      } catch (e) {
        // ignore invalid
      }
    }
  }, []);

  const saveDraft = (markdown: string) => {
    if (!markdown.trim()) return;
    
    // Simple update logic: if exactly identical content, ignore. Usually you'd use IDs.
    const newDraft: Draft = {
      id: Date.now().toString(),
      markdown,
      updatedAt: Date.now()
    };

    setDrafts(prev => {
      // Keep only last 20
      const next = [newDraft, ...prev].slice(0, 20);
      localStorage.setItem('md-to-social-drafts', JSON.stringify(next));
      return next;
    });
  };

  return { drafts, saveDraft };
}
