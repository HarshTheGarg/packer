const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

const connectToDatabase = async () => {
    await mongoose.connect(mongoUri);
};

// Connect to the database
connectToDatabase()
    .then(() => {
        console.log(`Connected to MongoDB at ${mongoUri}`);
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

// Enable CORS for all routes
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware to parse JSON bodies
app.use(express.json());

if (process.env.ENV === "PRODUCTION") {
    const testRoutes = require("./src/routes/test.routes.cjs");
    app.use("/api/v1.0/tests", testRoutes);
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
