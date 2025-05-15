import { serve } from "@hono/node-server";

import("./hono").then(({ default: m }) => {
  serve(
    {
      port: 32300,
      fetch: m.fetch,
    },
    (info) => {
      console.log(`Listening on http://localhost:${info.port}`);
    }
  );
});
