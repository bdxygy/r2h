import { Hono } from "hono";
import authRoutes from "./routes/auth";
import { getSignedCookie } from "hono/cookie";

const api = new Hono({
  strict: true,
});

api.get("/", async (c) => {
  const cookie = c.req.header("cookie");

  console.log({ cookie });

  const foo = await getSignedCookie(c, Buffer.from("secret", "utf-8"), "foo");

  if (foo) return c.text(`Hello ${foo}`);

  return c.text("Hello world!");
});

api.route("auth", authRoutes);

export default api;
