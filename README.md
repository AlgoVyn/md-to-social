# Markdown2Social

A sleek, modern web application that converts Markdown content into formatted social media posts. Write in Markdown, preview in real-time across 12+ platforms, and copy formatted content ready for LinkedIn, Twitter/X, Instagram, and more.

![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?logo=vitest)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 Multi-Platform Support
Switch seamlessly between **12 social media platforms**, each with accurate character limits and preview styling:

- **LinkedIn** (3,000 chars)
- **Twitter/X** (280 chars) with thread splitting
- **Instagram** (2,200 chars)
- **Threads** (500 chars)
- **Bluesky** (300 chars)
- **Mastodon** (500 chars)
- **Discord** (2,000 chars)
- **Reddit** (40,000 chars)
- **YouTube** (5,000 chars)
- **Facebook** (63,206 chars)
- **TikTok** (2,200 chars)
- **Telegram** (4,096 chars)

### 📝 Live Markdown Editor
- **Syntax Highlighting**: Full CodeMirror 6 integration with Markdown language support
- **Real-time Character Counter**: Animated ring showing your progress with color-coded states:
  - 🟢 **Green**: Within limits
  - 🟡 **Yellow**: Approaching limit (90%+)
  - 🔴 **Red**: Over limit with shake animation
- **Platform-aware URL counting**: Twitter/X counts URLs as 23 characters

### 👁️ Real-time Platform Previews
See exactly how your content will appear on each platform:
- **LinkedIn**: Professional post preview with engagement actions
- **Twitter/X**: Thread preview with navigation for multi-post threads
- **Instagram**: Mobile-optimized image post preview
- **Bluesky**: Clean, modern post styling
- **Generic Preview**: Clean text preview for all other platforms

### 🎨 Formatting Styles
Choose from multiple copy formats via the settings gear:
- **Standard**: Preserve original Markdown formatting
- **Bullet-optimized**: Convert bullet lists to ✅ emojis
- **Bold headers**: Convert `## Headers` to **Bold Text**
- **Unicode Text**: Convert `**bold**` and `_italic_` to Unicode variants (𝗯𝗼𝗹𝗱, 𝘪𝘵𝘢𝘭𝘪𝘤) that render on all platforms

### 💻 Code Highlighting
- Syntax highlighting for **30+ programming languages** via highlight.js
- GitHub-style theme for beautiful code blocks
- Language auto-detection or explicit declaration

### 💾 Draft Management
- **Auto-save History**: Drafts automatically saved with timestamps
- **Persistent Storage**: Drafts survive browser restarts
- **One-click Restore**: Return to any previous version
- **Visual Timeline**: Browse history with formatted preview snippets

### ♿ Accessibility First
- Full keyboard navigation support
- Screen reader optimized with ARIA labels
- `prefers-reduced-motion` support for animations
- `prefers-contrast: high` mode support
- Focus visible indicators throughout

### 🎭 Premium UI/UX
- **Glass-morphism Design**: Modern translucent UI with backdrop blur
- **Smooth Animations**: CSS-powered micro-interactions
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Responsive Layout**: Optimized for desktop and tablet devices
- **Custom Platform Selector**: Beautiful dropdown with platform icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd md-to-social

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📖 Usage

1. **Select Platform**: Choose your target platform from the dropdown (defaults to LinkedIn)
2. **Write**: Enter Markdown content in the editor on the left
3. **Preview**: See the formatted output in real-time on the right
4. **Monitor**: Watch the character counter ring - it animates based on your usage
5. **Configure**: Click the settings gear to choose your formatting style
6. **Copy**: Click "Copy" to copy formatted content to your clipboard
7. **Paste**: Paste into your chosen social platform

### Creating Twitter/X Threads

When you exceed Twitter's 280-character limit, the preview automatically shows:
- Thread indicator showing post position (e.g., "1 / 3")
- Navigation arrows to browse between posts
- Individual copy buttons for each post

### Markdown Support

The editor supports standard Markdown syntax:

| Feature | Syntax | Preview |
|---------|--------|---------|
| Headers | `# H1`, `## H2` | Large bold text |
| Bold | `**text**` | **Bold text** |
| Italic | `*text*` or `_text_` | *Italic text* |
| Bullets | `- item` or `* item` | • Bullet points |
| Numbered | `1. item` | 1. Numbered list |
| Code Inline | `` `code` `` | `inline code` |
| Code Block | ` ```js\ncode\n``` ` | Syntax highlighted block |
| Links | `[text](url)` | Clickable links |

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Testing**: Vitest + React Testing Library + JSDOM
- **Code Editor**: CodeMirror 6 with @codemirror/lang-markdown
- **Markdown Parsing**: Marked with marked-highlight
- **Syntax Highlighting**: Highlight.js (GitHub theme)
- **Sanitization**: DOMPurify
- **Icons**: Lucide React + Custom SVG platform icons
- **Styling**: CSS Variables with glass-morphism effects

## 📁 Project Structure

```
md-to-social/
├── src/
│   ├── components/
│   │   ├── Workspace.tsx           # Main editor workspace
│   │   ├── MarkdownEditor.tsx      # CodeMirror-based editor
│   │   ├── LivePreview.tsx         # Platform-specific previews
│   │   ├── PlatformSelect.tsx      # Custom platform dropdown
│   │   ├── CharacterCounter.tsx    # Animated counter ring
│   │   ├── Toolbar.tsx             # Action toolbar with tooltips
│   │   ├── StyleModal.tsx          # Formatting settings
│   │   ├── HistoryModal.tsx        # Draft history
│   │   └── icons/                  # Platform icon components
│   │       ├── SocialIcons.tsx     # SVG icons for 12 platforms
│   │       └── PlatformIcons.tsx   # Icon mapping
│   ├── hooks/
│   │   ├── useHistory.ts           # Draft history management
│   │   ├── useToast.ts             # Toast notification system
│   │   └── useModalAccessibility.ts # Modal a11y handling
│   ├── utils/
│   │   ├── markdownParser.ts       # Markdown parsing & Unicode conversion
│   │   ├── platforms.ts            # Platform configurations
│   │   └── threadSplitter.ts       # Twitter thread splitting logic
│   ├── integration/                # E2E workflow tests
│   ├── App.tsx
│   └── main.tsx
├── design/
│   └── product_requirements_document.html
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests once
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Check Prettier formatting
- `npm run format:fix` - Fix Prettier formatting

### Testing

The project has comprehensive test coverage (375+ tests):

- **Unit Tests**: Component rendering, props, and interactions
- **Integration Tests**: Full user workflows (copy, platform switching, history)
- **Accessibility Tests**: ARIA attributes, keyboard navigation, focus management

```bash
# Run specific test file
npm test -- src/components/Workspace.test.tsx

# Run with coverage
npm test -- --coverage
```

## 🎨 Design System

### CSS Variables

The app uses CSS custom properties for theming:

```css
/* Colors */
--bg-color: #ffffff;
--surface-color: #f3f3f3;
--text-color: #1e1e1e;
--primary-color: #007acc;

/* Shadows (Glass-morphism) */
--shadow-glass: 0 4px 30px rgba(0, 0, 0, 0.05);
--shadow-premium: 0 20px 25px -5px rgb(0 0 0 / 0.1);

/* Z-Index Scale */
--z-dropdown: 100;
--z-tooltip: 300;
--z-modal: 500;
```

### Animations

All animations respect `prefers-reduced-motion`:

- **Character Counter**: Breathing animation, ring rotation, pulse effects
- **Empty States**: Fade-in with slide-up
- **Tooltips**: Scale-in with opacity
- **Warnings**: Shake animation when over limit

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- CodeMirror for the excellent editor component
- Highlight.js for syntax highlighting
- Lucide for the beautiful icon set
- The React team for the amazing framework

---

Built with ❤️ for content creators who love Markdown.
