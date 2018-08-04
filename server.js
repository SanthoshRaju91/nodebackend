const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan());

app.get("/", (req, res) => {
  res.send("Use the endpoint /api/");
});

app.use("/api/v1/", [routes]);

app.listen(PORT, err => {
  if (err) console.error(`Error listening on ${PORT} - ${err}`);
  console.log(`Listening on port ${PORT}`);
});
