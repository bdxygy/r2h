import { JSX } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Readable } from "stream";
import { ServerContextI } from "./server-context";

// Helper function to convert Node.js stream to Response using PassThrough
export const streamToResponse = (stream: Readable): Response => {
    return new Response(
        Readable.toWeb(stream) as unknown as ReadableStream<Uint8Array>,
        {
            headers: {
                "content-type": "text/html",
            },
        }
    );
};

export const getDataMapFromPipeStream = (
    component: JSX.Element,
    serverContext: ServerContextI
): Promise<ServerContextI> => {
    return new Promise((resolve, reject) => {
        renderToPipeableStream(component, {
            onShellReady: () => {
                const newContext = { ...serverContext };
                Promise.all(newContext.handlers).then(() => {
                    newContext.handlers = [];
                    newContext.isServer = false;
                    resolve(newContext);
                });
            },
            onShellError(err) {
                reject(err);
            },
            onError(err) {
                reject(err);
            },
        });
    });
};
