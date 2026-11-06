// Design tokens. Primary greens are derived from the Selo logo (#00A14B),
// darkened where needed so text and buttons meet WCAG AA (checked in scripts/check-contrast.mjs).
export const tokens = {
  light: {
    'color-brand': '#00A14B',          // logo only
    'color-primary': '#087A3F',        // 5.4:1 on white
    'color-primary-strong': '#066332',
    'color-primary-soft': '#DDF6E7',
    'color-on-primary': '#FFFFFF',
    'color-accent': '#F59E0B',
    'color-ink': '#0F172A',
    'color-ink-muted': '#475569',
    'color-surface': '#FFFFFF',
    'color-surface-alt': '#F8FAFC',
    'color-border': '#E2E8F0',
    'color-border-strong': '#CBD5E1',
    'color-success': '#15803D',
    'color-danger': '#DC2626',
    'bubble-customer': '#FFFFFF',
    'bubble-store': '#DCFCE7',
    'bubble-meta': '#475569',
    'chat-wallpaper': '#EEF4EF',
    'phone-frame': '#0F172A',
    'shadow': '0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06)',
    'shadow-lg': '0 2px 4px rgba(15,23,42,.06), 0 24px 48px rgba(15,23,42,.12)',
  },
  dark: {
    'color-brand': '#00A14B',
    'color-primary': '#3DDC84',
    'color-primary-strong': '#7BEAAA',
    'color-primary-soft': '#0D3A23',
    'color-on-primary': '#052E16',
    'color-accent': '#FBBF24',
    'color-ink': '#F1F5F9',
    'color-ink-muted': '#94A3B8',
    'color-surface': '#0B1220',
    'color-surface-alt': '#111A2E',
    'color-border': '#1E293B',
    'color-border-strong': '#334155',
    'color-success': '#4ADE80',
    'color-danger': '#F87171',
    'bubble-customer': '#1E293B',
    'bubble-store': '#14532D',
    'bubble-meta': '#CBD5E1',
    'chat-wallpaper': '#0F1A17',
    'phone-frame': '#020617',
    'shadow': '0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.35)',
    'shadow-lg': '0 2px 4px rgba(0,0,0,.4), 0 24px 48px rgba(0,0,0,.5)',
  },
};

const block = (o) => Object.entries(o).map(([k, v]) => `  --${k}: ${v};`).join('\n');

export function tokensCss() {
  return `:root {\n${block(tokens.light)}\n  color-scheme: light;\n}
@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${block(tokens.dark)}\n  color-scheme: dark;\n  }\n}
:root[data-theme="dark"] {\n${block(tokens.dark)}\n  color-scheme: dark;\n}\n`;
}
