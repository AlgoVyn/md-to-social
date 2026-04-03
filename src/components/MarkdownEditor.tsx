import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import './MarkdownEditor.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return (
    <div className="editor-container">
      <CodeMirror
        value={value}
        height="100%"
        extensions={[markdown({ base: markdownLanguage })]}
        onChange={onChange}
        className="codemirror-editor"
        theme="light"
      />
    </div>
  );
};
