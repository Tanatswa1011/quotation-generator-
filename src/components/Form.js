
import React, { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

const Form = () => {
  const [clientName, setClientName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [items, setItems] = useState([{ service: '', quantity: 1, unitPrice: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [logo, setLogo] = useState(null);
  const [notes, setNotes] = useState('');

  const handleAddItem = () => {
    setItems([...items, { service: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    const tax = (subtotal * taxRate) / 100;
    const total = subtotal + tax - discount;
    return { subtotal, tax, total };
  };

  const handleGeneratePDF = () => {
    // Convert taxRate and discount to numbers
    const numericTaxRate = parseFloat(taxRate) || 0;
    const numericDiscount = parseFloat(discount) || 0;

    // Log the values for debugging
    console.log("Client Name:", clientName, typeof clientName);
    console.log("Contact Details:", contactDetails, typeof contactDetails);
    console.log("Items:", items, Array.isArray(items));
    console.log("Tax Rate:", numericTaxRate, typeof numericTaxRate);
    console.log("Discount:", numericDiscount, typeof numericDiscount);
    console.log("Logo:", logo);
    console.log("Notes:", notes, typeof notes);

    // Call generatePDF and handle potential errors
    try {
      generatePDF(clientName, contactDetails, items, numericTaxRate, numericDiscount, logo, notes);
      alert("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please check your input.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quotation/Invoice Generator</h2>
      <input 
          type="text" 
          placeholder="Client Name" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)} 
          className="border p-2 mb-4 w-full"
      />
      <input 
          type="text" 
          placeholder="Contact Details" 
          value={contactDetails} 
          onChange={(e) => setContactDetails(e.target.value)} 
          className="border p-2 mb-4 w-full"
      />
      {items.map((item, index) => (
        <div key={index}>
          <input type="text" placeholder="Service" value={item.service} onChange={(e) => handleItemChange(index, 'service', e.target.value)} />
          <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)} />
          <input type="number" placeholder="Unit Price" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)} />
        </div>
      ))}
      <button onClick={handleAddItem}>Add Item</button>
      <input type="number" placeholder="Tax Rate (%)" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} />
      <input type="number" placeholder="Discount" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} />
      <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
      <textarea placeholder="Custom Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <div className="mt-4">
        <button onClick={handleGeneratePDF} className="bg-blue-500 text-white p-2 rounded">
          Generate PDF
        </button>
        <h3>Totals</h3>
        <p>Subtotal: {calculateTotal().subtotal.toFixed(2)}</p>
        <p>Tax: {calculateTotal().tax.toFixed(2)}</p>
        <p>Total: {calculateTotal().total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Form;
