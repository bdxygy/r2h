import { auth } from "$server/lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";

const authRoutes = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

authRoutes.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

authRoutes.on(["GET", "POST"], "/api/auth/**", async (c) =>
  auth.handler(c.req.raw)
);

authRoutes.use(
  "/api/auth/**", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:32300", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization", "Cookie", "Set-Cookie"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

export default authRoutes;
