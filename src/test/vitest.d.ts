import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

declare module 'vitest' {
  interface Assertion<T = any> extends AsymmetricMatchersContaining {
    toBeInTheDocument(): void;
    toHaveClass(className: string): void;
    toHaveTextContent(text: string | RegExp): void;
    toHaveValue(value: string): void;
    toBeChecked(): void;
    toBeDisabled(): void;
    toBeEnabled(): void;
    toBeEmpty(): void;
    toBeVisible(): void;
    toBeHidden(): void;
    toHaveAttribute(attr: string, value?: string): void;
    toHaveStyle(style: Record<string, any>): void;
    toHaveFocus(): void;
    toContainElement(element: HTMLElement): void;
    toContainHTML(html: string): void;
    toHaveAccessibleName(name?: string | RegExp): void;
    toHaveAccessibleDescription(description?: string | RegExp): void;
    toBeValid(): void;
    toBeInvalid(): void;
    toBeRequired(): void;
  }
}
