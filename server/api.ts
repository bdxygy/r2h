import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { describeRoute, openAPISpecs } from "hono-openapi";
import authRoutes from "./routes/auth";

const api = new Hono();

api.get(
  "/",
  describeRoute({
    description: "Hello world",
    tags: ["hello"],
    responses: {
      200: {
        description: "Successful response",
      },
    },
    validateResponse: true,
  }),
  (c) => {
    return c.json({ name: "Hello world" }, 200);
  },
);

api.get(
  "/openapi",
  openAPISpecs(api, {
    documentation: {
      info: {
        title: "Hono",
        version: "1.0.0",
        description: "API for greeting users",
      },
      servers: [
        {
          url: "http://localhost:32300/api",
          description: "Local server",
        },
      ],
    },
  }),
);

api.get(
  "/docs",
  Scalar({
    theme: "solarized",
    url: "/api/openapi",
    baseServerURL: "http://localhost:32300/api/",
  }),
);

api.route("/", authRoutes);

export default api;
