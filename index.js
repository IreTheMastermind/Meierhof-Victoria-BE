const express = require("express");
const connect = require("./mongoose/mongo");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
connect();

app.use(express.json({ extended: false }));

app.use("/", require("./routes/user"));

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
