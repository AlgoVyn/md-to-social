import { LinkedInIcon } from './SocialIcons';
import { TwitterIcon } from './SocialIcons';
import { InstagramIcon } from './SocialIcons';
import { ThreadsIcon } from './SocialIcons';
import { MastodonIcon } from './SocialIcons';
import { BlueskyIcon } from './SocialIcons';
import { DiscordIcon } from './SocialIcons';
import { RedditIcon } from './SocialIcons';
import { YouTubeIcon } from './SocialIcons';
import { FacebookIcon } from './SocialIcons';
import { TikTokIcon } from './SocialIcons';
import { TelegramIcon } from './SocialIcons';

import type { IconProps } from './SocialIcons';

// Map of platform keys to their icon components
export const PLATFORM_ICONS: Record<string, React.FC<IconProps>> = {
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  threads: ThreadsIcon,
  mastodon: MastodonIcon,
  bluesky: BlueskyIcon,
  discord: DiscordIcon,
  reddit: RedditIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  telegram: TelegramIcon,
};
