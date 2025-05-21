import { Hono } from "hono";
import {
    setSignedCookie,
} from 'hono/cookie'

export const authRoutes = new Hono({
    strict: false
});

authRoutes.get("/", async (c) => {

    await setSignedCookie(c, "foo", "bar", Buffer.from("secret", "utf-8"), {
        httpOnly: true
    });

    return c.html("Please Check the Cookies");
});

authRoutes.get("/check", async (c) => {
    return c.json({ status: true });
})