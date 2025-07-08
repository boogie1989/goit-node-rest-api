import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import { sequelize } from "./db/database.js";
import { Contact } from "./db/models/contact.js";

const app = express();

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Database connection successful");
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
