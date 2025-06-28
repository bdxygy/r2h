import {
  type ServerContextI,
  ServerQueryProvider,
} from "$shared/server-context";
import { lazy, StrictMode } from "react";

const Root = lazy(() => import("./Root"));
const BrowserRouter = lazy(() =>
  import("react-router").then((m) => ({ default: m.BrowserRouter })),
);
declare global {
  interface Window {
    __SERVER_QUERY__: Record<string, unknown>;
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
      </StrictMode>,
    );
  });
};
