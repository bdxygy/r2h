import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { ServerContextI, ServerQueryProvider } from "$shared/server-context";

const Root = React.lazy(() => import("./root"));

declare global {
  interface Window {
    __SERVER_QUERY__: Record<string, any>;
  }
}

export const main = () => {
  hydrateRoot(
    document,
    <React.StrictMode>
      <ServerQueryProvider
        value={{ dataMap: window.__SERVER_QUERY__ } as ServerContextI}
      >
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ServerQueryProvider>
    </React.StrictMode>
  );
};
