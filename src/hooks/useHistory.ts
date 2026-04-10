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

    setDrafts(prev => {
      // Don't save if identical to most recent draft
      if (prev[0]?.markdown === markdown) return prev;

      const newDraft: Draft = {
        id: crypto.randomUUID(),
        markdown,
        updatedAt: Date.now()
      };

      // Keep only last 20
      const next = [newDraft, ...prev].slice(0, 20);
      try {
        localStorage.setItem('md-to-social-drafts', JSON.stringify(next));
      } catch (e) {
        // Silently fail if localStorage is not available or quota exceeded
        console.warn('Failed to save draft to localStorage:', e);
      }
      return next;
    });
  };

  return { drafts, saveDraft };
}
