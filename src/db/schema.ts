import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  createdAt: text('created_at').notNull(),
  type: text('type', { enum: ['contact', 'audit'] }).notNull().default('contact'),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  service: text('service'),
  budget: text('budget'),
  message: text('message'),
  siteUrl: text('site_url'),
  consentAt: text('consent_at').notNull(),
  ipHash: text('ip_hash').notNull(),
  userAgent: text('user_agent'),
  status: text('status', { enum: ['new', 'contacted', 'closed'] }).notNull().default('new'),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
