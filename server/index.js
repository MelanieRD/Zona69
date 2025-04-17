const express = require('express');
const app = express();
const PORT = process.env.PORT || 5074;
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect.js');

dbConnect();

const cors = require('cors');

// Configure CORS with specific options
app.use(cors({
    origin: process.env.URL_FRONTEND, // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const router = require("./routes/index.js");
app.use("/app", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("API funcionando en Vercel 🚀");
});

app.get("/hola", (req, res) => {
    res.send("HOLA, probando la ruta");
});

module.exports = app;