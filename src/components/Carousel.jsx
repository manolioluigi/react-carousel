import React, { useState, useEffect } from 'react';
import slides from '../data/slides';

const Carousel = () => {

    // logica
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const handleBulletClick = (index) => {
        setCurrentSlide(index);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'ArrowLeft') {
            handlePrev();
        } else if (event.key === 'ArrowRight') {
            handleNext();
        } else if (event.key === ' ') {
            // Spazio per fermare/riprendere l'autoplay
            setAutoplay((prevAutoplay) => !prevAutoplay);
        }
    };

    useEffect(() => {
        const handleAutoplay = () => {
            if (autoplay) {
                handleNext();
            }
        };

        const interval = setInterval(handleAutoplay, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [autoplay, currentSlide]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentSlide]);

    // HTML
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="top-bar">
                <h2>{slides[currentSlide].title}</h2>
            </div>
            <div className="carousel">
                <div className="button-left" onClick={handlePrev}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="slide">
                    <img src={slides[currentSlide].image} alt={`Slide ${currentSlide + 1}`} />
                </div>
                <div className="button-right" onClick={handleNext}>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>
            <div className="bottom-bar">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={currentSlide === index ? 'bullet active' : 'bullet'}
                        onClick={() => handleBulletClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
