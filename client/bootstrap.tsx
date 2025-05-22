import { lazy, StrictMode } from "react";
import { ServerContextI, ServerQueryProvider } from "$shared/server-context";

const Root = lazy(() => import("./root"));
const BrowserRouter = lazy(() => import("react-router").then(m => ({ default: m.BrowserRouter })));
declare global {
  interface Window {
    __SERVER_QUERY__: Record<string, any>;
  }
}

export const main = () => {
  import("react-dom/client").then(({ hydrateRoot }) => {
    hydrateRoot(
      document,
      <StrictMode>
        <ServerQueryProvider
          value={{ dataMap: window.__SERVER_QUERY__ } as ServerContextI}
        >
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </ServerQueryProvider>
      </StrictMode>
    );
  })
};
