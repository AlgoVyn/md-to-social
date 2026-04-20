/**
 * Formats content for HTML clipboard with preserved whitespace for code blocks.
 *
 * LinkedIn and other rich text editors support HTML clipboard format.
 * This function wraps code blocks in <pre> tags with styling to preserve indentation.
 *
 * @param text - The plain text content (already processed by markdownToSocialText)
 * @returns HTML string formatted for clipboard
 */
export const formatForHtmlClipboard = (text: string): string => {
  if (!text) return '';

  // Escape HTML special characters
  const escapeHtml = (str: string): string =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const lines = text.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];

    // Detect potential code block start (line with indentation or looks like code)
    const isIndented = line.startsWith('    ') || line.startsWith('  ');
    const hasCodeKeyword =
      /^(def |class |if |for |while |import |from |const |let |var |function |return |#|\/\/|\/\*|\*|\+|-|\{)/.test(
        line
      );
    const looksLikeCode = isIndented || hasCodeKeyword;

    if (!inCodeBlock && looksLikeCode) {
      // Check if next line is also indented or empty (potential code block)
      const nextIsIndented = nextLine?.startsWith('    ') || nextLine?.startsWith('  ');
      const nextIsEmpty = !nextLine || nextLine.trim() === '';

      if (nextIsIndented || nextIsEmpty || hasCodeKeyword) {
        inCodeBlock = true;
        codeBlockLines = [line];
        continue;
      }
    }

    if (inCodeBlock) {
      const isStillCode =
        line.startsWith('    ') ||
        line.startsWith('  ') ||
        line.trim() === '' ||
        /^(def |class |if |for |while |import |from |const |let |var |function |return |#|\/\/|\/\*|\*|\+|-|\{)/.test(
          line
        );

      if (isStillCode) {
        codeBlockLines.push(line);
        continue;
      } else {
        // End of code block - wrap and add
        result.push(wrapCodeBlock(codeBlockLines));
        inCodeBlock = false;
        codeBlockLines = [];
      }
    }

    // Regular paragraph
    if (line.trim() === '') {
      result.push('<br>');
    } else {
      result.push(`<p>${escapeHtml(line)}</p>`);
    }
  }

  // Don't forget any remaining code block
  if (inCodeBlock && codeBlockLines.length > 0) {
    result.push(wrapCodeBlock(codeBlockLines));
  }

  return result.join('');
};

/**
 * Wraps code block lines in a styled <pre> tag to preserve formatting.
 */
const wrapCodeBlock = (lines: string[]): string => {
  const content = lines
    .map((line) => {
      // Escape HTML but preserve the actual characters
      return line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    })
    .join('\n');

  // Use <pre> with white-space: pre to preserve all whitespace
  // Note: Hardcoded colors are optimized for light mode. Dark mode support
  // would require theme-aware styling or CSS custom properties.
  return `<pre style="margin:8px 0;padding:12px;background:#f6f8fa;border-radius:6px;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;font-size:85%;line-height:1.45;white-space:pre;word-wrap:normal;overflow-x:auto;color:#24292e;">${content}</pre>`;
};

/**
 * Copies content to clipboard with both HTML and plain text formats.
 *
 * Uses the modern Clipboard API with ClipboardItem to write multiple formats.
 * This allows rich text editors like LinkedIn to receive HTML with proper formatting,
 * while plain text paste targets receive the text version.
 *
 * @param text - The plain text content (from markdownToSocialText)
 * @returns Promise that resolves when copy is complete
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  if (!text) {
    throw new Error('No content to copy');
  }

  // Check if modern Clipboard API with write() is supported
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    const html = formatForHtmlClipboard(text);

    const htmlBlob = new Blob([html], { type: 'text/html' });
    const textBlob = new Blob([text], { type: 'text/plain' });

    const clipboardItem = new ClipboardItem({
      'text/html': htmlBlob,
      'text/plain': textBlob,
    });

    await navigator.clipboard.write([clipboardItem]);
  } else if (navigator.clipboard?.writeText) {
    // Fallback to plain text only
    await navigator.clipboard.writeText(text);
  } else {
    throw new Error('Clipboard API not available');
  }
};

/**
 * Checks if the browser supports rich text clipboard copying.
 */
export const supportsRichTextClipboard = (): boolean => {
  return typeof ClipboardItem !== 'undefined' && !!navigator.clipboard?.write;
};
