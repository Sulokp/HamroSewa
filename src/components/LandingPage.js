import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export const Navigation = () => {
    // State to toggle mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav id="menu" className="nav-bar fixed-navbar">
            <div className="nav-container">
                <div className="nav-logo-ul">
                    <a className="nav-logo" href="#page-top">
                        <img
                            src="/Hamro Sewa.png"
                            alt="Hamro Sewa Logo"
                            className="nav-logo-image"
                        />
                    </a>
                </div>

                {/* Hamburger Button for Mobile */}
                <button className="nav-toggle" onClick={toggleMenu}>
                    <span className="nav-toggle-icon"></span>
                </button>

                {/* Navigation Links */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <a href="#features" className="nav-link">
                            Features
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="nav-link">
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="nav-link">
                            About Us
                        </a>
                    </li>
                    <li>
                        <Link to="/User" className="nav-cta">
                            Hire Now
                        </Link>
                    </li>
                    <li>
                        <Link to="/professional" className="nav-cta">
                            Work as Professional
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export const Header = () => {
    return (
        <header id="header" className="header">
            <div className="header-intro">
                <div className="header-overlay"></div>
                <video autoPlay muted loop className="header-video">
                    <source src="/bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="header-content">
                    <h1>Hamro Sewa</h1>
                    <p>Your one-stop solution for household services.</p>
                    <Link to="/User" className="cta-button">
                        Hire Now
                    </Link>
                </div>
            </div>
        </header>
    );
};

export const Services = () => {
    return (
        <div id="services" className="services-section">
            <div className="container">
                <div className="services-title">
                    <h2>Our Services</h2>
                    <p>
                        Find qualified professionals for a wide range of household and
                        commercial needs. From plumbing to painting, we've got you covered!
                    </p>
                </div>
                <div className="services-gallery">
                    <div className="service-item">
                        <img src="/plumbing.jpg" alt="Plumbing" className="service-image" />
                        <h3>Plumbing</h3>
                        <p>
                            Experienced plumbers for all types of installations, repairs, and
                            maintenance.
                        </p>
                    </div>
                    <div className="service-item">
                        <img src="/painting.jpg" alt="Painting" className="service-image" />
                        <h3>Painting</h3>
                        <p>
                            Professional painters to give your space a fresh and vibrant look.
                        </p>
                    </div>
                    {/* Add more services as needed */}
                </div>
            </div>
        </div>
    );
};

export const Features = () => {
    return (
        <div id="features" className="features-section">
            <div className="container">
                <div className="section-title">
                    <h2>Features</h2>
                    <p>Why choose Hamro Sewa?</p>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <i className="fa fa-check-circle"></i>
                        <h3>Quality Service</h3>
                        <p>Top-rated professionals ensure high-quality work.</p>
                    </div>
                    <div className="col-xs-6">
                        <i className="fa fa-clock"></i>
                        <h3>Timely Delivery</h3>
                        <p>Services delivered on time, every time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const About = () => {
    return (
        <div id="about" className="about-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src="/about.jpg"
                            alt="About Us"
                            className="img-responsive about-image"
                        />
                    </div>
                    <div className="col-md-6 about-text">
                        <h2>About Hamro Sewa</h2>
                        <p>
                            Hamro Sewa is a trusted platform for connecting consumers with
                            professionals offering household and commercial services.
                        </p>
                        <ul className="list-style">
                            <li>Verified professionals</li>
                            <li>Affordable pricing</li>
                            <li>Wide range of services</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ContactUs = () => {
    return (
        <div id="contact-us" className="contact-section">
            <div className="container">
                <div className="section-title">
                    <h2>Contact Us</h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Email Us</h3>
                        <p>info@hamrosewa.com</p>
                    </div>
                    <div className="col-md-6">
                        <h3>Call Us</h3>
                        <p>+977-1234567890</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navigation />
            <Header />
            <Services />
            <Features />
            <About />
            <ContactUs />
        </div>
    );
};

export default LandingPage;
