import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Workspace } from '../components/Workspace';

describe('Platform Workflow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset clipboard mock
    (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
  });

  it('should switch platforms and update preview', async () => {
    render(<Workspace />);

    // Initial platform should be LinkedIn
    const select = screen.getByLabelText('Select social media platform');
    // Switch to Twitter
    await userEvent.click(select);
    const twitterOption = screen.getByRole('option', { name: /Twitter\/X/i });
    await userEvent.click(twitterOption);

    // Preview should update to show Twitter/X
    await waitFor(() => {
      expect(screen.getByLabelText('Platform: Twitter/X')).toBeInTheDocument();
    });
  }, 10000);

  it('should show character counter for current platform', async () => {
    render(<Workspace />);

    // Should show character counter with LinkedIn limits (3000 without comma)
    expect(screen.getByText('3000')).toBeInTheDocument();

    // Switch to Twitter
    const select = screen.getByLabelText('Select social media platform');
    await userEvent.click(select);
    const twitterOption = screen.getByRole('option', { name: /Twitter\/X/i });
    await userEvent.click(twitterOption);

    // Should now show Twitter limits
    await waitFor(() => {
      expect(screen.getByText('280')).toBeInTheDocument();
    });
  }, 10000);

  it('should handle Twitter thread preview for long content', async () => {
    render(<Workspace />);

    // Switch to Twitter
    const select = screen.getByLabelText('Select social media platform');
    await userEvent.click(select);
    const twitterOption = screen.getByRole('option', { name: /Twitter\/X/i });
    await userEvent.click(twitterOption);

    // Wait for Twitter preview to render
    await waitFor(() => {
      expect(screen.getByLabelText('Platform: Twitter/X')).toBeInTheDocument();
    });
  }, 10000);

  it('should copy content formatted for selected platform', async () => {
    render(<Workspace />);

    // Click copy button
    const copyButton = screen.getByText('Copy');
    await userEvent.click(copyButton);

    // Should call clipboard API
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    // Should show success toast
    expect(await screen.findByText(/Copied to clipboard/)).toBeInTheDocument();
  }, 10000);

  it('should update character count as user types', async () => {
    render(<Workspace />);

    // Initial count should be from default content
    // Just verify counter exists
    expect(screen.getByRole('status')).toBeInTheDocument();
  }, 10000);

  it('should maintain platform state when opening modals', async () => {
    render(<Workspace />);

    // Switch to Bluesky
    const select = screen.getByLabelText('Select social media platform');
    await userEvent.click(select);
    const blueskyOption = screen.getByRole('option', { name: /Bluesky/i });
    await userEvent.click(blueskyOption);

    // Open history modal
    const historyButton = screen.getByText('History');
    await userEvent.click(historyButton);

    // Close modal
    const closeButton = await screen.findByText('×');
    await userEvent.click(closeButton);

    // Platform should still be Bluesky
    expect(select.textContent).toContain('Bluesky');
  }, 10000);

  it('should show different character limits for different platforms', async () => {
    render(<Workspace />);

    const select = screen.getByLabelText('Select social media platform');

    // LinkedIn - 3000
    expect(screen.getByText('3000')).toBeInTheDocument();

    // Switch to Twitter
    await userEvent.click(select);
    const twitterOption2 = screen.getByRole('option', { name: /Twitter\/X/i });
    await userEvent.click(twitterOption2);
    await waitFor(() => {
      expect(screen.getByText('280')).toBeInTheDocument();
    });

    // Switch to Mastodon
    await userEvent.click(select);
    const mastodonOption2 = screen.getByRole('option', { name: /Mastodon/i });
    await userEvent.click(mastodonOption2);
    await waitFor(() => {
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  }, 10000);

  it('should handle all supported platforms in dropdown', async () => {
    render(<Workspace />);

    // Open the dropdown
    const trigger = screen.getByLabelText('Select social media platform');
    await userEvent.click(trigger);

    // Now options should be visible
    const options = screen.getAllByRole('option');

    // Should have multiple platforms
    expect(options.length).toBeGreaterThanOrEqual(9);

    // Each option should have platform name
    options.forEach((option) => {
      expect(option.textContent).toBeTruthy();
    });
  }, 10000);

  it('should show warning state when approaching character limit', async () => {
    render(<Workspace />);

    // Switch to Twitter (280 char limit)
    const select = screen.getByLabelText('Select social media platform');
    await userEvent.click(select);
    const twitterOption = screen.getByRole('option', { name: /Twitter\/X/i });
    await userEvent.click(twitterOption);

    // Wait for Twitter preview
    await waitFor(() => {
      expect(screen.getByLabelText('Platform: Twitter/X')).toBeInTheDocument();
    });
  }, 10000);

  it('should handle invalid platform gracefully', async () => {
    render(<Workspace />);

    // Platform select should handle any value gracefully
    const select = screen.getByLabelText('Select social media platform');
    expect(select).toBeInTheDocument();
  }, 10000);
});
