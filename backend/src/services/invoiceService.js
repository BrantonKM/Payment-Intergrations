const PDFDocument = require('pdfkit');


function generateInvoicePdf(order) {
return new Promise((resolve) => {
const doc = new PDFDocument({ size: 'A4' });
const buffers = [];
doc.on('data', buffers.push.bind(buffers));
doc.on('end', () => resolve(Buffer.concat(buffers)));


doc.fontSize(20).text('Invoice', { align: 'center' });
doc.moveDown();
doc.fontSize(12).text(`Reference: ${order.ref}`);
doc.text(`Customer: ${order.customer?.name || ''}`);
doc.text(`Email: ${order.customer?.email || ''}`);
doc.moveDown();


order.items?.forEach(it => {
doc.text(`${it.qty} x ${it.name} @ ${it.price}`);
});


doc.moveDown();
doc.text(`Total: ${order.amount} ${order.currency}`);
doc.end();
});
}


module.exports = { generateInvoicePdf };