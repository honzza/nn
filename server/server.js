const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Config
const PORT = process.env.PORT || 5000;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Phone bill - total price",
      version: "1.0.0",
      description:
        "This webpage is a documentation of the API of the application Phone bill - total price",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: { name: "honzza dvorak" },
    },
    servers: [
      { url: "https://phone-bill-total-cost.appspot.com" },
      { url: "http://localhost:5000" },
    ],
  },
  apis: ["./routes/*-routes.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.text());

// Routes definition
app.use("/api/phonebill", require("./routes/phonebill-routes"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
