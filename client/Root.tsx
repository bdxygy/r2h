import { lazy } from "react";

import Logo from "./assets/react.svg";
import "./Root.css";

const App = lazy(() => import("./App"));

function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href={Logo} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>R2H</title>
        <link href="/public/main.css" rel="stylesheet"></link>
      </head>
      <body>
        <div id="root">
          <App />
        </div>
      </body>
    </html>
  );
}

export default Root;
