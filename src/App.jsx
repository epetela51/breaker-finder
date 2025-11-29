import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router";

import Home from "./pages/Home/Home";
import BreakerFinder from "./pages/BreakerFinder/BreakerFinder";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/breaker" element={<BreakerFinder />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
