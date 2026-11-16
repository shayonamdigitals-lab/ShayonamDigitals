import { describe, it, expect } from 'vitest';
import { contactFormSchema } from './validation';

describe('contactFormSchema', () => {
  it('validates a valid project inquiry', () => {
    const valid = {
      type: 'contact',
      name: 'Rajesh Shah',
      email: 'rajesh@example.com',
      phone: '+91 98765 43210',
      service: 'website-design',
      budget: '25k-50k',
      message: 'We need a clean website for our manufacturing business in Bhavnagar.',
      consent: true,
    };
    const result = contactFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects an inquiry without consent', () => {
    const invalid = {
      type: 'contact',
      name: 'Rajesh Shah',
      email: 'rajesh@example.com',
      message: 'Need a fast website.',
      consent: false,
    };
    const result = contactFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('requires siteUrl when type is audit', () => {
    const auditWithoutUrl = {
      type: 'audit',
      name: 'Rajesh Shah',
      email: 'rajesh@example.com',
      consent: true,
    };
    const result = contactFormSchema.safeParse(auditWithoutUrl);
    expect(result.success).toBe(false);
  });

  it('accepts audit with valid siteUrl', () => {
    const auditWithUrl = {
      type: 'audit',
      name: 'Rajesh Shah',
      email: 'rajesh@example.com',
      siteUrl: 'https://example.com',
      consent: true,
    };
    const result = contactFormSchema.safeParse(auditWithUrl);
    expect(result.success).toBe(true);
  });
});

