import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "$server/lib/db";
import { openAPI } from "better-auth/plugins";
import { validator } from "validation-better-auth";
import { z } from "zod";

import { createAuthMiddleware } from "better-auth/api";
import { account, session, user, verification } from "./schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),
  basePath: "/api/auth",
  plugins: [
    openAPI(),
    validator([
      {
        path: "/sign-up/email",
        schema: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
        before: (ctx) => {
          console.log(ctx);
        },
        after: (ctx) => {
          console.log(ctx);
        },
      },
      {
        path: "/sign-in/email",
        schema: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
        before: (ctx) => {
          console.log(ctx);
        },
        after: (ctx) => {
          console.log(ctx);
        },
      },
    ]),
  ],
  rateLimit: {
    enabled: true,
    max: 10,
    ttl: 60 * 1000,
  },
  baseURL: "http://localhost:32300",
  advanced: {
    useSecureCookies: true,
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if you want email verification
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
});
