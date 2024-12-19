import React from 'react';

const Preview = ({ clientName, contactDetails, items, taxRate, discount, logo, notes }) => {
  const calculateTotal = () => {
    const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    const tax = (subtotal * taxRate) / 100;
    const total = subtotal + tax - discount;
    return { subtotal, tax, total };
  };

  return (
    <div>
      <h2>Preview</h2>
      {logo && <img src={URL.createObjectURL(logo)} alt="Company Logo" />}
      <h3>{clientName}</h3>
      <p>{contactDetails}</p>
      <h4>Items</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.service}: {item.quantity} x ${item.unitPrice}</li>
        ))}
      </ul>
      <h4>Totals</h4>
      <p>Subtotal: ${calculateTotal().subtotal.toFixed(2)}</p>
      <p>Tax: ${calculateTotal().tax.toFixed(2)}</p>
      <p>Total: ${calculateTotal().total.toFixed(2)}</p>
      <h4>Notes</h4>
      <p>{notes}</p>
    </div>
  );
};

export default Preview;
