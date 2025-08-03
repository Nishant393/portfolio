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

const allowedOrigins = [
  "https://portfolio-client-five-nu.vercel.app/",
  "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());

app.get("/", (req, res) => {
  const q = "SELECT * FROM new_table;";
  db.query(q, (err, data) => {
    if (err){

      console.log(err)
    return res.json(err)
    ;}
    return res.json(data);
  });
});

app.use("/me", personalInfoRoute);
app.use("/projects", projectsRoute);
app.use("/skills", skillsRoute);
app.use("/contacts", contactsRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
 
});


export default app