//Load modules
const dotenv = require("dotenv");
dotenv.config();
const configurationManager = require("./src/config/api.config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const logger = require("./src/utils/logger");
const { seedDatabaseAsync } = require("./src/infrastructure/data/mongo.db.data.initializer");
//Create the Express App
const app = express();

//Setup Request body JSON Parsing
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Enable All CORS Requests
app.use(
	cors({
		origin: "*",
		allowedHeaders: "*",
		exposedHeaders: ["Content-Disposition", "Content-Type"],
	})
);

app.use(helmet());

// Configure Services
app.use("/api/pdfManager", require("./src/routes/pdf.manager.route"));
app.use("/api/users", require("./src/routes/user.route"));

mongoose.connect(configurationManager.connectionString);

mongoose.connection.once("open", () => {
	logger.info(" Connect Database....");
});

if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	startupDebugger("✨ Enabled Morgon......");
}

app.get("/", (request, response) => {
	response.send("<h3>🖥️ Welcome API Documentation</h3>");
});

const port = process.env.PORT || 4000;
seedDatabaseAsync();
app.listen(port, () => {
	logger.info(`Web API Development: ${port}`);
});

/*npm run local:server*/
