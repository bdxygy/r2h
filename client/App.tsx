import { NavLink, Route, Routes } from "react-router";
import "./App.css";
import { lazy } from "react";
import Logo from "./assets/react.svg";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <header>
        <img src={Logo} className="logo" alt="logo" />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </header>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </>
  );
}

export default App;
