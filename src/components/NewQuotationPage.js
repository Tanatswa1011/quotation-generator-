import React, { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';
import '../styles.css';

const NewQuotationPage = () => {
    const [companyName, setCompanyName] = useState('');
    const [clientName, setClientName] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [quotationNumber, setQuotationNumber] = useState('');
    const [dateOfIssue, setDateOfIssue] = useState('');
    const [validityPeriod, setValidityPeriod] = useState('');
    const [customerDetails, setCustomerDetails] = useState('');
    const [items, setItems] = useState([{ service: '', quantity: 1, unitPrice: 0 }]);
    const [terms, setTerms] = useState('');
    const [signature, setSignature] = useState('');

    const handleAddItem = () => {
        setItems([...items, { service: '', quantity: 1, unitPrice: 0 }]);
    };

    const handleChangeItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleDownload = () => {
        generatePDF(companyName, clientName, contactDetails, items, 0, 0, terms, signature); // Pass contactDetails
    };

    return (
        <div className="container">
            <h1>Create Quotation</h1>
            <form>
                <div>
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Client Name</label>
                    <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contact Details</label>
                    <textarea
                        value={contactDetails}
                        onChange={(e) => setContactDetails(e.target.value)}
                    />
                </div>
                <div>
                    <label>Quotation Number</label>
                    <input
                        type="text"
                        value={quotationNumber}
                        onChange={(e) => setQuotationNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date of Issue</label>
                    <input
                        type="date"
                        value={dateOfIssue}
                        onChange={(e) => setDateOfIssue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Validity Period</label>
                    <input
                        type="text"
                        value={validityPeriod}
                        onChange={(e) => setValidityPeriod(e.target.value)}
                    />
                </div>
                <div>
                    <label>Customer Details</label>
                    <textarea
                        value={customerDetails}
                        onChange={(e) => setCustomerDetails(e.target.value)}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Item No.</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={item.service}
                                        onChange={(e) => handleChangeItem(index, 'service', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleChangeItem(index, 'quantity', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.unitPrice}
                                        onChange={(e) => handleChangeItem(index, 'unitPrice', e.target.value)}
                                    />
                                </td>
                                <td>{(item.quantity * item.unitPrice).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4">Subtotal</td>
                            <td>{items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">Tax</td>
                            <td>0.00</td>
                        </tr>
                        <tr>
                            <td colSpan="4">Discount</td>
                            <td>0.00</td>
                        </tr>
                        <tr>
                            <td colSpan="4">Grand Total</td>
                            <td>{items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                <button type="button" onClick={handleAddItem}>Add Item</button>
                <div>
                    <h3>Terms and Conditions</h3>
                    <textarea
                        value={terms}
                        onChange={(e) => setTerms(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Signature</h3>
                    <input
                        type="text"
                        placeholder="Authorized Signature"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleDownload}>Download PDF</button>
            </form>
            <footer>
                <p>Legal Disclaimer: This is a sample quotation.</p>
                <p>Thank you for your business!</p>
            </footer>
        </div>
    );
};

export default NewQuotationPage;
