import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Workspace } from "../components/Workspace";

describe("Copy Workflow Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should complete full copy workflow: edit -> preview -> copy -> toast", async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    (navigator.clipboard.writeText as any) = mockWriteText;

    render(<Workspace />);

    // Verify initial state - preview shows formatted content
    expect(screen.getByText("Live Preview")).toBeInTheDocument();
    const previewContent = document.querySelector(".post-content");
    expect(previewContent?.textContent).toMatch(/Write your post here/);

    // Click copy button
    const copyButton = screen.getByText("Copy").closest("button");
    expect(copyButton).not.toBeNull();

    if (copyButton) {
      await userEvent.click(copyButton);

      // Verify clipboard was called with formatted content
      expect(mockWriteText).toHaveBeenCalledTimes(1);
      const clipboardContent = mockWriteText.mock.calls[0][0];
      
      // Content should be formatted with unicode bold
      expect(clipboardContent).toContain("𝐇𝐞𝐥𝐥𝐨 𝐋𝐢𝐧𝐤𝐞𝐝𝐈𝐧");

      // Verify success toast appears
      await waitFor(() => {
        expect(
          screen.getByText("Copied to clipboard! Paste into LinkedIn to see formatted content.")
        ).toBeInTheDocument();
      });
    }
  });

  it("should handle copy failure gracefully", async () => {
    const mockWriteText = vi.fn().mockRejectedValue(new Error("Clipboard permission denied"));
    (navigator.clipboard.writeText as any) = mockWriteText;

    render(<Workspace />);

    const copyButton = screen.getByText("Copy").closest("button");
    if (copyButton) {
      await userEvent.click(copyButton);

      // Verify error toast appears
      await waitFor(() => {
        expect(
          screen.getByText("Failed to copy to clipboard")
        ).toBeInTheDocument();
      });
    }
  });

  it("should handle clipboard API not available", async () => {
    // Mock writeText as undefined to simulate unavailable clipboard
    const originalWriteText = navigator.clipboard.writeText;
    (navigator.clipboard as any).writeText = undefined;

    render(<Workspace />);

    const copyButton = screen.getByText("Copy").closest("button");
    if (copyButton) {
      await userEvent.click(copyButton);

      // Verify error toast appears
      await waitFor(() => {
        expect(
          screen.getByText("Clipboard API not available in your browser")
        ).toBeInTheDocument();
      });
    }

    // Restore
    (navigator.clipboard as any).writeText = originalWriteText;
  });

  it("should maintain consistent content between preview and clipboard", async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    (navigator.clipboard.writeText as any) = mockWriteText;

    render(<Workspace />);

    // Get the initial preview content
    const previewContent = document.querySelector(".post-content");
    const initialPreviewText = previewContent?.textContent;

    // Click copy
    const copyButton = screen.getByText("Copy").closest("button");
    if (copyButton) {
      await userEvent.click(copyButton);

      // Verify clipboard content matches preview
      const clipboardContent = mockWriteText.mock.calls[0][0];
      
      // Both should contain the same formatted text
      expect(clipboardContent).toContain("𝐇𝐞𝐥𝐥𝐨 𝐋𝐢𝐧𝐤𝐞𝐝𝐈𝐧");
      expect(initialPreviewText).toContain("𝐇𝐞𝐥𝐥𝐨 𝐋𝐢𝐧𝐤𝐞𝐝𝐈𝐧");
    }
  });

  it("should preserve formatting when copying multiple times", async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    (navigator.clipboard.writeText as any) = mockWriteText;

    render(<Workspace />);

    const copyButton = screen.getByText("Copy").closest("button");
    if (copyButton) {
      // Click copy three times
      await userEvent.click(copyButton);
      await userEvent.click(copyButton);
      await userEvent.click(copyButton);

      // All calls should have identical content
      expect(mockWriteText).toHaveBeenCalledTimes(3);
      
      const firstCall = mockWriteText.mock.calls[0][0];
      const secondCall = mockWriteText.mock.calls[1][0];
      const thirdCall = mockWriteText.mock.calls[2][0];
      
      expect(firstCall).toBe(secondCall);
      expect(secondCall).toBe(thirdCall);
    }
  });
});
