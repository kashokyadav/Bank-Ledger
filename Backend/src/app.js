const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")


const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

app.use(express.json());     
app.use(cookieParser()); 



// Routes Requirements
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');
const transactionRoutes = require('./routes/transaction.routes');


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes)

 


module.exports = app; 