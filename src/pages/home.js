import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/home.css";

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;

    useEffect(() => {
        setIsLoaded(true);
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        }, 4000); 

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const slides = [
        {
            title: "Dunk Low",
            photoClass: "shoe-dunk",
            primaryButton: "Przeglądaj buty Dunk Low",
            secondaryButton: "Poznaj inne modele Dunk"
        },
        {
            title: "Air Force 1",
            photoClass: "shoe-airforce",
            primaryButton: "Przeglądaj buty Air Force",
            secondaryButton: "Poznaj inne modele Air Force"
        },
        {
            title: "Air Jordan 1 Low",
            photoClass: "shoe-jordan",
            primaryButton: "Przeglądaj buty Jordan",
            secondaryButton: "Poznaj inne modele Jordan"
        }
    ];

    return (
        <div className="shoe-container">
            <div className="slider-container">
                <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div 
                            key={index} 
                            className={`shoe-content ${isLoaded ? 'loaded' : ''} ${currentSlide === index ? 'active' : ''}`}
                        >  
                            <div className="shoe-photo-container">
                                <div className={`shoe-photo ${slide.photoClass}`}></div>
                            </div>
                            
                            <div className="description">
                                <h1 className="title">{slide.title}</h1>
                                <p className="subtitle">{slide.subtitle}</p>
                            </div>
                            
                            <div className="buttons">
                                <button className="button primary">
                                    {slide.primaryButton}
                                    <span className="button-hover"></span>
                                </button>
                                <button className="button secondary">
                                    {slide.secondaryButton}
                                    <span className="button-hover"></span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="slider-nav prev" onClick={prevSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button className="slider-nav next" onClick={nextSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>

                <div className="slider-dots">
                    {slides.map((_, index) => (
                        <button 
                            key={index} 
                            className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
