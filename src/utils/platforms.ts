// Platform-specific configurations for social media
export interface PlatformConfig {
  name: string;
  characterLimit: number;
  supportsBold: boolean;
  supportsItalic: boolean;
  supportsLinks: boolean;
  supportsHashtags: boolean;
  supportsMentions: boolean;
  supportsImages: boolean;
  supportsVideos: boolean;
  warningThreshold: number; // Percentage at which to show warning
}

export const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  linkedin: {
    name: 'LinkedIn',
    characterLimit: 3000,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.85,
  },
  twitter: {
    name: 'Twitter/X',
    characterLimit: 280,
    supportsBold: true, // Unicode bold
    supportsItalic: true, // Unicode italic
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  instagram: {
    name: 'Instagram',
    characterLimit: 2200,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: false, // Only in bio
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  threads: {
    name: 'Threads',
    characterLimit: 500,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  mastodon: {
    name: 'Mastodon',
    characterLimit: 500,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  bluesky: {
    name: 'Bluesky',
    characterLimit: 300,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.85,
  },
  discord: {
    name: 'Discord',
    characterLimit: 2000,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: false,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  reddit: {
    name: 'Reddit',
    characterLimit: 40000,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: false,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  youtube: {
    name: 'YouTube',
    characterLimit: 5000,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  facebook: {
    name: 'Facebook',
    characterLimit: 63206,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  tiktok: {
    name: 'TikTok',
    characterLimit: 2200,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
  telegram: {
    name: 'Telegram',
    characterLimit: 4096,
    supportsBold: true,
    supportsItalic: true,
    supportsLinks: true,
    supportsHashtags: true,
    supportsMentions: true,
    supportsImages: true,
    supportsVideos: true,
    warningThreshold: 0.9,
  },
};

// Helper function to get platform config
export const getPlatformConfig = (platform: string): PlatformConfig => {
  return PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.linkedin;
};

// Helper function to calculate character count considering URLs
export const calculateCharacterCount = (text: string, platform: string): number => {
  const config = getPlatformConfig(platform);

  if (!config.supportsLinks) {
    // For platforms that don't support links, count the full URL text
    return text.length;
  }

  // Twitter/X and some platforms shorten URLs to a fixed length
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = text.match(urlRegex) || [];

  if (urls.length === 0) {
    return text.length;
  }

  // Twitter counts all URLs as 23 characters (or 24 for https)
  // For simplicity, we'll use 23 as the URL length for supported platforms
  const urlPlaceholderLength = 23;
  let count = text.length;

  for (const url of urls) {
    count -= url.length;
    count += urlPlaceholderLength;
  }

  return count;
};

export const getCharacterCountStatus = (
  text: string,
  platform: string
): { count: number; limit: number; percentage: number; isOver: boolean; isWarning: boolean } => {
  const config = getPlatformConfig(platform);
  const count = calculateCharacterCount(text, platform);
  const limit = config.characterLimit;
  const percentage = count / limit;
  const isOver = count > limit;
  const isWarning = percentage >= config.warningThreshold && !isOver;

  return { count, limit, percentage, isOver, isWarning };
};
