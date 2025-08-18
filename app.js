require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(express.json());

app.use("/user", require("./routes/authRoute"));
app.use("/courses", require("./routes/courseroute"));
app.use("/myaccount", require("./routes/myaccountroutes"));
app.use("/project", require("./routes/projectroute"));
app.use("/profile", require("./routes/profileRoute"));





let swaggerDocument;
try {
  swaggerDocument = require("./utils/swagger-output.json");
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.log("Swagger documentation not found. Run 'node utils/swagger.js' to generate it.");
}


mongoose
  .connect("mongodb+srv://huzaifaalics280:db786$@cluster0.koqyldh.mongodb.net/Iltezam")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
