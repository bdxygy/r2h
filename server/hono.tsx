import { Hono } from "hono";
import { renderToPipeableStream } from "react-dom/server";
import { serveStatic } from "@hono/node-server/serve-static";
import api from "./api";
import { StaticRouter } from "react-router";
import { PassThrough } from "stream";
import { compress } from "hono/compress";
import { getDataMapFromPipeStream, streamToResponse } from "$shared/stream";
import {
    ServerContextI,
    ServerQueryProvider,
} from "$shared/stores/server-context";
import { lazy } from "react";

const Root = lazy(() => import("$client/Root"));

const app = new Hono({
    strict: false,
});

app.use(
    compress({
        encoding: "gzip",
    })
);

app.use("/public/*", serveStatic({ root: "./_module" }));

app.route("/api", api);

app.get("/*", async (c) => {
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
        serverContext
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
                stream.push(
                    "<!DOCTYPE html><html><body><h1>Something went wrong</h1></body></html>"
                );
                stream.push(null);
            },
            onError(err) {
                didError = true;
                console.error(err);
            },
        }
    );

    c.req.raw.signal.addEventListener("abort", () => {
        abort();
    });

    if (didError) {
        return c.html(
            "<!DOCTYPE html><html><body><h1>Something went wrong</h1></body></html>",
            500
        );
    }

    return streamToResponse(stream);
});

export default app;
