const dotenv = require("dotenv");
dotenv.config();

const configurationManager = {
	//connectionString: process.env.connectionString,
	PDFReportPath: process.env.PDFReportPath,
};

module.exports = configurationManager;
