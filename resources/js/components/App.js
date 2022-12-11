import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Register from "../pages/Register/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>,
        document.getElementById('root')
    );
}
