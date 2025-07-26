import dotenv from "dotenv";
dotenv.config(); // Load this before anything else!

import express from "express";
import cors from "cors";

import { db } from "./config/db.js";
import personalInfoRoute from "./routes/personalInfoRoute.js";
import projectsRoute from "./routes/projectsRoute.js";
import skillsRoute from "./routes/skillsRoute.js";
import contactsRoute from "./routes/contactRoute.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
  const q = "SELECT * FROM new_schema.new_table;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.use("/me", personalInfoRoute);
app.use("/projects", projectsRoute);
app.use("/skills", skillsRoute);
app.use("/contacts", contactsRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
  console.log("DB ENV:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
  });
});
