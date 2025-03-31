import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import Shoes from './pages/men/shoes';
import Clothes from './pages/men/clothes';

function App() {
    return (
        
        <Router>
             <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/men/shoes" element={<Shoes />} />
                <Route path="/men/clothes" element={<Clothes />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
