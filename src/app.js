const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const errorHandler = require("./middleware/errorHandler");
const { PORT } = require("./config");
const app = express();
global.appRoot = path.resolve(__dirname);


//middlewares
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.json({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(compression());

//start
app.get("/", (req, res) => {
  res.send("Welcome to this Api...");
});

//routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/user"));

// CELEBRATE ERROR HANDLING
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`App running on: http://localhost:${PORT}`);
});
