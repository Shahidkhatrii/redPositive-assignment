const express = require("express");
const connectDb = require("./config/connectDb");
const cors = require("cors");
const dotenv = require("dotenv");
const formRoutes = require("./routes/formRoutes");
const emailRoutes = require("./routes/emailRoutes");
dotenv.config();
connectDb();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", formRoutes);
app.use("/api/send-email", emailRoutes);

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
