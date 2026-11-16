import { describe, it, expect } from 'vitest';
import { siteConfig } from '../src/config/site';

describe('Hide-When-Empty Rule (Section 5.2)', () => {
  it('should suppress pricing table when prices are not confirmed', () => {
    expect(siteConfig.features.showPricing).toBe(false);
  });

  it('should not render work or case study nav links when items are empty', () => {
    const hasWorkNav = siteConfig.navLinks.some((l) => l.href.includes('/work'));
    expect(hasWorkNav).toBe(false);
  });

  it('should not render fake testimonials nav or sections when reviews are empty', () => {
    expect(siteConfig.features.showTestimonials).toBe(false);
  });

  it('should have freeAudit feature flag enabled per approval', () => {
    expect(siteConfig.features.freeAudit).toBe(true);
  });
});
