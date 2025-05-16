
import { lazy } from "react";

import "./app.css";

const Router = lazy(() => import("./router"));
const Header = lazy(() => import("./components/layout/header"));

function App() {
  return (
    <>
      <Header />
      <Router />
    </>
  );
}

export default App;
