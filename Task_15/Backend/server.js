const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});