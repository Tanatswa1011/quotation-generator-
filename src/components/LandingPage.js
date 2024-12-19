import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <h1 className="landing-title">Welcome to the Quotation and Invoice Generator</h1>
            <p className="landing-description">
                Easily create professional quotations and invoices with our user-friendly tool. Get started now!
            </p>
            <div className="button-container">
                <button 
                    onClick={() => navigate('/quotation')} 
                    className="button quotation-button"
                >
                    Create Quotation
                </button>
                <button 
                    onClick={() => navigate('/invoice')} 
                    className="button invoice-button"
                >
                    Create Invoice
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
