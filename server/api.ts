import { Hono } from "hono";

const api = new Hono({
    strict: true
});

api.get("/", (c) => c.text("Hello world!"));

export default api