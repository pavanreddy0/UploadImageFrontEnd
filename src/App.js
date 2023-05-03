// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./Loader";
import routes from "./Routes";

// "proxy": "http://127.0.0.1:5000",

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Suspense fallback={<Loader />}>
          <Routes>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
