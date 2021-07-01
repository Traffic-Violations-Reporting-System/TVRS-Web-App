const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/user.routes.js")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to tvrs web application." });
});


// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});