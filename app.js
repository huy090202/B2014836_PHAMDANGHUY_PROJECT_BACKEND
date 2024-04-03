const express = require("express");
const cors = require("cors");
const routes = require("./app/routes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

routes(app);

module.exports = app;
