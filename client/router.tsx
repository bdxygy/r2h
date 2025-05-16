
import { lazy } from "react";
import { Routes, Route } from "react-router";

const Home = lazy(() => import("$client/pages/home"));
const About = lazy(() => import("$client/pages/about"));
const Router = () => (<Routes>
    <Route path="/" Component={Home} />
    <Route path="/about" Component={About} />
</Routes>);


export default Router