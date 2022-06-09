const express = require("express");
const app = express();
const router = express.Router();

// Config
const PORT = process.env.PORT || 5000;

app.use(express.text());

// // Routes
app.use("/test", require("./routes/phonebill-routes"));

// Unknown route error
app.use((req, res) => {
  res.status(404).send("404: Could not find this route");
});

// Error handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An uknown error occurred!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
