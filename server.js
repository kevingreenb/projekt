const express = require("express");
const path = require("path");
const connection = require("./config/db");
const bodyParse = require("body-parser");
const cors = require("cors");

const app = express();

connection();

app.use(cors({ origin: "*" }));
app.use(bodyParse.json());
app.use("/api/users", require("./controllers/users"));
app.use("/api/profiles", require("./controllers/profiles"));
app.use("/api/projects", require("./controllers/projects"));
app.use("/api/posts", require("./controllers/posts"));

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
