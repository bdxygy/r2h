import {
  type ServerContextI,
  ServerQueryProvider,
} from "$shared/server-context";
import { getDataMapFromPipeStream, streamToResponse } from "$shared/stream";
import { PassThrough } from "node:stream";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { lazy } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router";

import api from "./api";

const Root = lazy(() => import("$client/Root"));

const errorHtml =
  "<!DOCTYPE html><html><body><h1>Something went wrong</h1></body></html>";

const app = new Hono({
  strict: false,
});

app.use(
  compress({
    encoding: "gzip",
  }),
);

app.use("/public/*", serveStatic({ root: "./_module" }));

app.route("/api", api);

app.get("/favicon.ico", (c) => c.body(null, 204));

app.get("/*", async (c) => {
  const nonce = crypto.randomUUID();
  c.res.headers.set(
    "Content-Security-Policy",
    `script-src 'self' 'nonce-${nonce}'`,
  );

  try {
    let didError = false;
    const stream = new PassThrough();

    const serverContext: ServerContextI = {
      isServer: true,
      handlers: [],
      dataMap: {},
    };

    const componentFn = (sc: ServerContextI) => (
      <ServerQueryProvider value={sc}>
        <StaticRouter location={c.req.path}>
          <Root />
        </StaticRouter>
      </ServerQueryProvider>
    );

    const newServerContext = await getDataMapFromPipeStream(
      componentFn(serverContext),
      serverContext,
    );

    const { pipe, abort } = renderToPipeableStream(
      componentFn(newServerContext),
      {
        bootstrapModules: [
          {
            src: "/public/main.js",
          },
        ],
        bootstrapScriptContent: `
            window.__SERVER_QUERY__ = ${JSON.stringify(newServerContext.dataMap)};`,
        onShellReady: () => {
          pipe(stream);
        },
        onShellError(err) {
          didError = true;
          console.error(err);
          stream.push(new TextEncoder().encode(errorHtml));
        },
        nonce,
        onError(err) {
          didError = true;
          console.error(err);
        },
      },
    );

    c.req.raw.signal.addEventListener("abort", () => {
      abort();
    });

    if (didError) {
      throw new Error("Something went wrong");
    }

    return streamToResponse(stream);
  } catch (error) {
    console.error(error);
    return c.html(errorHtml, 500);
  }
});

export default app;
