import jsPDF from 'jspdf';

export const generatePDF = (clientName, contactDetails, items, taxRate, discount, logo, notes) => {
  const doc = new jsPDF();
  
  if (logo) {
    const logoUrl = URL.createObjectURL(logo);
    doc.addImage(logoUrl, 'PNG', 10, 10, 50, 50);
  }

  doc.setFontSize(20);
  doc.text('Quotation/Invoice', 14, 20);
  doc.setFontSize(12);
  doc.text(`Client Name: ${clientName}`, 14, 30);
  doc.text(`Contact Details: ${contactDetails}`, 14, 40);
  
  doc.text('Items:', 14, 50);
  items.forEach((item, index) => {
    doc.text(`${item.service}: ${item.quantity} x $${item.unitPrice}`, 14, 60 + (10 * index));
  });

  const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax - discount;

  doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, 60 + (10 * items.length));
  doc.text(`Tax: $${tax.toFixed(2)}`, 14, 70 + (10 * items.length));
  doc.text(`Total: $${total.toFixed(2)}`, 14, 80 + (10 * items.length));
  
  doc.text(`Notes: ${notes}`, 14, 90 + (10 * items.length));
  
  doc.save('quotation-invoice.pdf');
};
