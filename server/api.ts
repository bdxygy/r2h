import { type } from "arktype";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator as arkValidator, resolver } from "hono-openapi/arktype";
import authRoutes from "./routes/auth";

const api = new Hono();

const responseSchema = type({
  name: "string",
});

const querySchema = type({
  name: "string",
});

api.get(
  "/",
  describeRoute({
    description: "Hello world",
    tags: ["hello"],
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: resolver(responseSchema),
          },
        },
      },
    },
    validateResponse: true,
  }),
  arkValidator("query", querySchema),
  async (c) => {
    const { name } = c.req.valid("query");
    return c.json({ name });
  },
);

api.route("/", authRoutes);

export default api;
