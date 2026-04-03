import React, { useState, useEffect } from "react";
import { Toolbar } from "./Toolbar";
import { MarkdownEditor } from "./MarkdownEditor";
import { LivePreview } from "./LivePreview";
import { StyleModal } from "./StyleModal";
import { HistoryModal } from "./HistoryModal";
import { parseMarkdown, markdownToSocialText } from "../utils/markdownParser";
import { useHistory } from "../hooks/useHistory";
import "./Workspace.css";

export const Workspace: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
    "# Hello LinkedIn\n\nWrite your post here...",
  );
  const [htmlPreview, setHtmlPreview] = useState<string>("");
  const [platform, setPlatform] = useState<string>("linkedin");
  const [formatStyle, setFormatStyle] = useState<string>("standard");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const { drafts, saveDraft } = useHistory();

  useEffect(() => {
    const html = parseMarkdown(markdown, formatStyle);
    setHtmlPreview(html);

    // Auto-save debounced roughly
    const timeout = setTimeout(() => {
      saveDraft(markdown);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [markdown, formatStyle]);

  const handleCopy = async () => {
    const socialText = markdownToSocialText(markdown, formatStyle, platform);
    const htmlPreview = parseMarkdown(markdown, formatStyle, true); // true = forClipboard with inline styles

    try {
      const blobHtml = new Blob([htmlPreview], { type: "text/html" });
      const blobText = new Blob([socialText], { type: "text/plain" });

      const item = new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      });
      await navigator.clipboard.write([item]);
      alert(
        "Copied formatted content to clipboard (Rich Text + Plain Text available)!",
      );
    } catch (e) {
      // Fallback
      navigator.clipboard.writeText(socialText);
      alert("Copied plain text format to clipboard!");
    }
  };

  const handleOpenSettings = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="workspace">
      <Toolbar
        onCopy={handleCopy}
        onOpenSettings={handleOpenSettings}
        onOpenHistory={() => setIsHistoryOpen(true)}
        platform={platform}
        setPlatform={setPlatform}
      />
      <div className="workspace-panes">
        <div className="pane left-pane">
          <MarkdownEditor value={markdown} onChange={setMarkdown} />
        </div>
        <div className="pane right-pane">
          <LivePreview contentHtml={htmlPreview} platform={platform} />
        </div>
      </div>
      <StyleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formatStyle={formatStyle}
        setFormatStyle={setFormatStyle}
      />
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        drafts={drafts}
        onLoadDraft={(draft) => setMarkdown(draft.markdown)}
      />
    </div>
  );
};
