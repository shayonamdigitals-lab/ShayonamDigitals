CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`type` text DEFAULT 'contact' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`service` text,
	`budget` text,
	`message` text,
	`site_url` text,
	`consent_at` text NOT NULL,
	`ip_hash` text NOT NULL,
	`user_agent` text,
	`status` text DEFAULT 'new' NOT NULL
);
