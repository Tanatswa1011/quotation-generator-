import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NewQuotationPage from './components/NewQuotationPage';
import InvoicePage from './components/InvoicePage';

const Routing = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
       
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quotation" element={<NewQuotationPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Routing;
