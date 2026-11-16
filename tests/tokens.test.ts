import { describe, it, expect } from 'vitest';

function sRGB_to_lum(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255.0;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255.0;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255.0;
  const adjust = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
}

function getContrast(c1: string, c2: string): number {
  const l1 = sRGB_to_lum(c1);
  const l2 = sRGB_to_lum(c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Design Tokens WCAG AA Contrast Checks', () => {
  const tokens = {
    paper: '#FFFEFC',
    surface: '#F7F2EA',
    ink: '#3A2C22',
    inkMuted: '#6B594D',
    espresso: '#2A201B',
    amberText: '#A45806',
    goldEspresso: '#F0D49C',
  };

  it('ink on paper passes WCAG AAA (>= 7:1)', () => {
    const ratio = getContrast(tokens.ink, tokens.paper);
    expect(ratio).toBeGreaterThanOrEqual(7.0);
  });

  it('inkMuted on paper passes WCAG AA (>= 4.5:1)', () => {
    const ratio = getContrast(tokens.inkMuted, tokens.paper);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('amberText on paper passes WCAG AA (>= 4.5:1)', () => {
    const ratio = getContrast(tokens.amberText, tokens.paper);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('amberText on surface passes WCAG AA (>= 4.5:1)', () => {
    const ratio = getContrast(tokens.amberText, tokens.surface);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('goldEspresso on espresso dark band passes WCAG AAA (>= 7:1)', () => {
    const ratio = getContrast(tokens.goldEspresso, tokens.espresso);
    expect(ratio).toBeGreaterThanOrEqual(7.0);
  });
});
