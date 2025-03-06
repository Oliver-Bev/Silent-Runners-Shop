import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/home.css";

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
       
        setIsLoaded(true);
    }, []);

    return (
        <div className="shoe-container">
            <div className={`shoe-content ${isLoaded ? 'loaded' : ''}`}>  
                <div className="shoe-photo-container">
                    <div className="shoe-photo"></div>
                </div>
                
                <div className="description">
                    <h1 className="title">Dunk Low</h1>
                    <p className="subtitle">Iconic design. Timeless style.</p>
                </div>
                
                <div className="buttons">
                    <button className="button primary">
                        Przeglądaj buty Dunk Low
                        <span className="button-hover"></span>
                    </button>
                    <button className="button secondary">
                        Poznaj inne modele Dunk
                        <span className="button-hover"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
