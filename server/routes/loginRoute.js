import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Needed to resolve file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userFile = path.join(__dirname, "../config/user.json");

// POST /login
router.post("/", (req, res) => {
    console.log("hello to pst")
  const { email, password } = req.body;

  // Read user.json file
  fs.readFile(userFile, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading user.json:", err);
      return res.status(500).json({ message: "Server error" });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ message: "Invalid user data" });
    }

    // Check user credentials
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Successful login
    res.status(200).json({ message: "Login successful", user: { email: user.email } });
  });
});

export default router;
