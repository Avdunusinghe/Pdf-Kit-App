const fs = require("fs");
const PDFDocument = require("pdfkit");
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");

const pdfData = {
	shipping: {
		name: "John Doe",
		address: "1234 Main Street",
		city: "San Francisco",
		state: "CA",
		country: "US",
		postal_code: 94111,
	},
	items: [
		{
			item: "TC 100",
			description: "Toner Cartridge",
			quantity: 2,
			amount: 6000,
		},
		{
			item: "USB_EXT",
			description: "USB Cable Extender",
			quantity: 1,
			amount: 2000,
		},
	],
	subtotal: 8000,
	paid: 0,
	invoice_nr: 1234,
};

const generatePdf = async (request, response) => {
	try {
		// Define invoice data and create a new PDF document ** you need to get data from database
		const invoice = pdfData;
		const document = new PDFDocument({ size: "A4", margin: 50 });
		const fileName = `Invoice_${uuidv4()}`;

		// Set response headers for the PDF
		response.setHeader("Content-Type", "application/pdf");
		response.setHeader("Content-Disposition", `inline; filename=${fileName}.pdf`);

		// Stream the generated PDF directly to the response
		document.pipe(response);

		// Generate PDF content
		generateHeader(document);
		generateCustomerInformation(document, invoice);
		generateInvoiceTable(document, invoice);
		generateFooter(document);

		// Finalize the PDF and send it
		document.end();
	} catch (error) {
		logger.error(error);
		response.status(500).send("An error occurred while generating the PDF.");
	}
};

// report helper private methods
const generateHeader = (document) => {
	document
		.image("logo.png", 50, 45, {
			width: 50,
		})
		.fillColor("#444444")
		.fontSize(20)
		.text("ACME Inc.", 110, 57)
		.fontSize(10)
		.text("ACME Inc.", 200, 50, { align: "right" })
		.text("123 Main Street", 200, 65, { align: "right" })
		.text("New York, NY, 10025", 200, 80, { align: "right" })
		.moveDown();
};

const generateCustomerInformation = (document, invoice) => {
	document.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

	generateHr(document, 185);

	const customerInformationTop = 200;

	document
		.fontSize(10)
		.text("Invoice Number:", 50, customerInformationTop)
		.font("Helvetica-Bold")
		.text(invoice.invoice_nr, 150, customerInformationTop)
		.font("Helvetica")
		.text("Invoice Date:", 50, customerInformationTop + 15)
		.text(formatDate(new Date()), 150, customerInformationTop + 15)
		.text("Balance Due:", 50, customerInformationTop + 30)
		.text(formatCurrency(invoice.subtotal - invoice.paid), 150, customerInformationTop + 30)

		.font("Helvetica-Bold")
		.text(invoice.shipping.name, 300, customerInformationTop)
		.font("Helvetica")
		.text(invoice.shipping.address, 300, customerInformationTop + 15)
		.text(
			invoice.shipping.city + ", " + invoice.shipping.state + ", " + invoice.shipping.country,
			300,
			customerInformationTop + 30
		)
		.moveDown();

	generateHr(document, 252);
};

const generateInvoiceTable = (document, invoice) => {
	let i;
	const invoiceTableTop = 330;

	document.font("Helvetica-Bold");
	generateTableRow(document, invoiceTableTop, "Item", "Description", "Unit Cost", "Quantity", "Line Total");
	generateHr(document, invoiceTableTop + 20);
	document.font("Helvetica");

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			document,
			position,
			item.item,
			item.description,
			formatCurrency(item.amount / item.quantity),
			item.quantity,
			formatCurrency(item.amount)
		);

		generateHr(document, position + 20);
	}

	const subtotalPosition = invoiceTableTop + (i + 1) * 30;
	generateTableRow(document, subtotalPosition, "", "", "Subtotal", "", formatCurrency(invoice.subtotal));

	const paidToDatePosition = subtotalPosition + 20;
	generateTableRow(document, paidToDatePosition, "", "", "Paid To Date", "", formatCurrency(invoice.paid));

	const duePosition = paidToDatePosition + 25;
	document.font("Helvetica-Bold");
	generateTableRow(document, duePosition, "", "", "Balance Due", "", formatCurrency(invoice.subtotal - invoice.paid));
	document.font("Helvetica");
};

const generateFooter = (document) => {
	document
		.fontSize(10)
		.text("Payment is due within 15 days. Thank you for your business.", 50, 780, { align: "center", width: 500 });
};

const generateTableRow = (document, y, item, description, unitCost, quantity, lineTotal) => {
	document
		.fontSize(10)
		.text(item, 50, y)
		.text(description, 150, y)
		.text(unitCost, 280, y, { width: 90, align: "right" })
		.text(quantity, 370, y, { width: 90, align: "right" })
		.text(lineTotal, 0, y, { align: "right" });
};

const generateHr = (document, y) => {
	document.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
};

const formatCurrency = (cents) => {
	return "$" + (cents / 100).toFixed(2);
};

const formatDate = (date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return year + "/" + month + "/" + day;
};

module.exports = {
	generatePdf,
};
