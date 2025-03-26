import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import Men from './pages/men';

function App() {
    return (
        
        <Router>
             <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/men" element={<Men />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
