import { z } from 'zod';

export const serviceEnum = z.enum([
  'website-design',
  'web-apps',
  'social-media',
  'website-redesign',
  'care-plans',
  'other',
]);

export const budgetEnum = z.enum([
  'under-25k',
  '25k-50k',
  '50k-100k',
  '100k-plus',
  'not-sure',
]);

const phoneRegex = /^(\+?[0-9\s\-]{7,15})?$/;
const urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/i;

export const contactFormSchema = z.object({
  type: z.enum(['contact', 'audit']).default('contact'),
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters).')
    .max(80, 'Name must be 80 characters or fewer.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email('Please enter a valid email address.'))
    .pipe(z.string().max(254, 'Email must be 254 characters or fewer.')),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Please enter a valid phone number or leave blank.',
    }),
  service: serviceEnum.optional(),
  budget: budgetEnum.optional(),
  message: z
    .string()
    .trim()
    .max(2000, 'Message must be 2000 characters or fewer.')
    .optional(),
  siteUrl: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || urlRegex.test(val), {
      message: 'Please enter a valid website URL starting with http:// or https://',
    }),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy to submit.',
  }),
  honeypot: z.string().optional(),
  turnstileToken: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === 'audit' && (!data.siteUrl || data.siteUrl.length < 4)) {
    ctx.addIssue({
      code: 'custom',
      path: ['siteUrl'],
      message: 'Website URL is required for a free audit.',
    });
  }
  if (data.type === 'contact' && (!data.message || data.message.length < 10)) {
    ctx.addIssue({
      code: 'custom',
      path: ['message'],
      message: 'Please tell us briefly about your project (at least 10 characters).',
    });
  }
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
