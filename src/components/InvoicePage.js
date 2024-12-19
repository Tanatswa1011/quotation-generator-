import React, { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';
import '../styles.css';

const InvoicePage = () => {
    const [clientName, setClientName] = useState('');
    const [items, setItems] = useState([{ service: '', quantity: 1, unitPrice: 0 }]);

    const handleAddItem = () => {
        setItems([...items, { service: '', quantity: 1, unitPrice: 0 }]);
    };

    const handleChangeItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleDownload = () => {
        generatePDF(clientName, '', items, 0, 0, null, ''); // Assuming taxRate and discount are 0 for now
    };

    return (
        <div className="container">
            <h1>Create Invoice</h1>
            <form>
                <div>
                    <label>Client Name</label>
                    <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </div>
                {items.map((item, index) => (
                    <div key={index}>
                        <label>Service</label>
                        <input
                            type="text"
                            value={item.service}
                            onChange={(e) => handleChangeItem(index, 'service', e.target.value)}
                        />
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleChangeItem(index, 'quantity', e.target.value)}
                        />
                        <label>Unit Price</label>
                        <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleChangeItem(index, 'unitPrice', e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddItem}>Add Item</button>
                <button type="button" onClick={handleDownload}>Download PDF</button>
            </form>
        </div>
    );
};

export default InvoicePage;
