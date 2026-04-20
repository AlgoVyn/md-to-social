import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatForHtmlClipboard, copyToClipboard, supportsRichTextClipboard } from './clipboard';

describe('clipboard utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('formatForHtmlClipboard', () => {
    it('should return empty string for empty input', () => {
      expect(formatForHtmlClipboard('')).toBe('');
    });

    it('should wrap plain text in paragraph tags', () => {
      const result = formatForHtmlClipboard('Hello world');
      expect(result).toBe('<p>Hello world</p>');
    });

    it('should convert empty lines to <br> tags', () => {
      const result = formatForHtmlClipboard('Line 1\n\nLine 2');
      expect(result).toContain('<p>Line 1</p>');
      expect(result).toContain('<br>');
      expect(result).toContain('<p>Line 2</p>');
    });

    it('should wrap indented code blocks in <pre> tags', () => {
      const code = 'def hello():\n    print("world")';
      const result = formatForHtmlClipboard(code);
      expect(result).toContain('<pre');
      expect(result).toContain('</pre>');
      expect(result).toContain('white-space:pre');
    });

    it('should preserve indentation in code blocks', () => {
      const code = '    indented_line\n        more_indented';
      const result = formatForHtmlClipboard(code);
      // The content should have preserved spaces
      expect(result).toContain('    indented_line');
      expect(result).toContain('        more_indented');
    });

    it('should escape HTML special characters in content', () => {
      const result = formatForHtmlClipboard('Text with <script> & "quotes"');
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('&amp;');
      expect(result).toContain('&quot;quotes&quot;');
    });

    it('should escape HTML in code blocks', () => {
      const code = 'const x = "<div>"';
      const result = formatForHtmlClipboard(code);
      expect(result).toContain('&lt;div&gt;');
    });

    it('should handle Python-style code blocks', () => {
      const code = 'def hello():\n    if True:\n        print("hi")\n    return';
      const result = formatForHtmlClipboard(code);
      expect(result).toContain('<pre');
      expect(result).toContain('def hello():');
    });

    it('should handle JavaScript-style code blocks', () => {
      const code = 'function test() {\n    const x = 1;\n    return x;\n}';
      const result = formatForHtmlClipboard(code);
      expect(result).toContain('<pre');
      expect(result).toContain('function test()');
    });
  });

  describe('copyToClipboard', () => {
    it('should throw error for empty content', async () => {
      await expect(copyToClipboard('')).rejects.toThrow('No content to copy');
    });

    it('should use rich text clipboard API when available', async () => {
      // Ensure ClipboardItem is defined (it might have been set to undefined by a previous test)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (globalThis as any).ClipboardItem === 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).ClipboardItem = class ClipboardItem {
          constructor(public data: Record<string, Blob>) {}
        };
      }

      const mockWrite = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator.clipboard, 'write', {
        value: mockWrite,
        writable: true,
      });

      await copyToClipboard('Test content');

      expect(mockWrite).toHaveBeenCalledTimes(1);
      const clipboardItems = mockWrite.mock.calls[0][0];
      expect(clipboardItems).toHaveLength(1);
      expect(clipboardItems[0]).toBeInstanceOf(ClipboardItem);
    });

    it('should fallback to writeText when ClipboardItem is not available', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalClipboardItem = (globalThis as any).ClipboardItem;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).ClipboardItem = undefined;

      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator.clipboard, 'writeText', {
        value: mockWriteText,
        writable: true,
      });

      await copyToClipboard('Test content');

      expect(mockWriteText).toHaveBeenCalledTimes(1);
      expect(mockWriteText).toHaveBeenCalledWith('Test content');

      // Restore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).ClipboardItem = originalClipboardItem;
    });

    it('should throw error when clipboard API is not available', async () => {
      const originalWrite = navigator.clipboard.write;
      const originalWriteText = navigator.clipboard.writeText;

      Object.defineProperty(navigator.clipboard, 'write', {
        value: undefined,
        writable: true,
      });
      Object.defineProperty(navigator.clipboard, 'writeText', {
        value: undefined,
        writable: true,
      });

      await expect(copyToClipboard('Test')).rejects.toThrow('Clipboard API not available');

      // Restore
      Object.defineProperty(navigator.clipboard, 'write', {
        value: originalWrite,
        writable: true,
      });
      Object.defineProperty(navigator.clipboard, 'writeText', {
        value: originalWriteText,
        writable: true,
      });
    });
  });

  describe('supportsRichTextClipboard', () => {
    it('should return true when ClipboardItem and clipboard.write are available', () => {
      // Ensure both ClipboardItem and clipboard.write are available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (globalThis as any).ClipboardItem === 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).ClipboardItem = class ClipboardItem {
          constructor(public data: Record<string, Blob>) {}
        };
      }
      // Ensure clipboard.write is defined
      if (!navigator.clipboard.write) {
        Object.defineProperty(navigator.clipboard, 'write', {
          value: vi.fn(),
          writable: true,
        });
      }
      expect(supportsRichTextClipboard()).toBe(true);
    });

    it('should return false when ClipboardItem is not available', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalClipboardItem = (globalThis as any).ClipboardItem;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).ClipboardItem = undefined;

      expect(supportsRichTextClipboard()).toBe(false);

      // Restore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).ClipboardItem = originalClipboardItem;
    });

    it('should return false when clipboard.write is not available', () => {
      const originalWrite = navigator.clipboard.write;
      Object.defineProperty(navigator.clipboard, 'write', {
        value: undefined,
        writable: true,
      });

      expect(supportsRichTextClipboard()).toBe(false);

      // Restore
      Object.defineProperty(navigator.clipboard, 'write', {
        value: originalWrite,
        writable: true,
      });
    });
  });
});
