import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '../src/lib/validation';

describe('Contact Form Zod Schema Validation', () => {
  it('should accept a valid project quote submission', () => {
    const input = {
      type: 'contact',
      name: 'Rajesh Shah',
      email: 'rajesh@example.com',
      phone: '+91 98791 81464',
      service: 'website-design',
      budget: '25k-50k',
      message: 'We need a business website for our retail store in Bhavnagar.',
      consent: true,
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('should accept a valid free website audit submission', () => {
    const input = {
      type: 'audit',
      name: 'Priya Patel',
      email: 'priya@example.com',
      siteUrl: 'https://myclinic.com',
      consent: true,
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('should reject a free audit submission if website URL is missing', () => {
    const input = {
      type: 'audit',
      name: 'Priya Patel',
      email: 'priya@example.com',
      siteUrl: '',
      consent: true,
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('siteUrl'))).toBe(true);
    }
  });

  it('should reject submission if consent is false', () => {
    const input = {
      type: 'contact',
      name: 'Rajesh Shah',
      email: 'rajesh@example.com',
      message: 'We need a business website for our retail store in Bhavnagar.',
      consent: false,
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('should reject invalid email formats', () => {
    const input = {
      type: 'contact',
      name: 'Rajesh Shah',
      email: 'not-an-email',
      message: 'We need a business website for our retail store in Bhavnagar.',
      consent: true,
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('should reject message shorter than 10 characters for contact inquiries', () => {
    const input = {
      type: 'contact',
      name: 'Rajesh Shah',
      email: 'rajesh@example.com',
      message: 'Short',
      consent: true,
    };
    const result = contactFormSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('message'))).toBe(true);
    }
  });
});
