/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

type Env = {
  DB?: any;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
  OWNER_NOTIFICATION_EMAIL?: string;
  [key: string]: any;
};

type Runtime = import('@astrojs/cloudflare').Runtime;

declare namespace App {
  interface Locals extends Runtime {}
}

declare module 'cloudflare:workers' {
  export const env: Env;
}
