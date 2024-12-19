import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import QuotationPage from './components/QuotationPage';
import InvoicePage from './components/InvoicePage';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Quotation/Invoice Generator</h1>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quotation" element={<QuotationPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
