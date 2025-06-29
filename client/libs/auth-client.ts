import { createAuthClient } from "better-auth/client";
import type { auth } from "$server/lib/auth.ts";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:32300",
  plugins: [inferAdditionalFields<typeof auth>()],
});
