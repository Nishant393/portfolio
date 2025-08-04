import { db } from "../config/db.js"
import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

// Configure your transporter (use environment variables in production)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


export const getContacts = async (req, res) => {
  try {
    const q = "SELECT * FROM contacts;"
    db.query(q, (err, data) => {
      if (err) return res.json("something went wrong")
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}


export const submitContacts = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // console.log(req.body)

    const q = `
      INSERT INTO contacts 
      (name, email, message) 
      VALUES (?, ?, ?)
    `;

    const values = [name, email, message];

    db.query(q, values, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error", details: err });
      }

      // Send confirmation email
      const mailOptions = {
        from: `"Portfolio Contact" <${email}>`,
        to: process.env.EMAIL,
        subject: "New Contact Form Submission",
        html: `
          <h3>You received a new contact form submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      };
      try {
        // console.log("transporter",transporter)
        console.log("email,password", process.env.EMAIL, process.env.EMAIL_PASSWORD)
        await transporter.sendMail(mailOptions);
        return res.status(201).json({ message: "Contact added and email sent", data });
      } catch (mailError) {
        console.error("Email error:", mailError);
        return res.status(500).json({ error: "Contact saved, but email failed", details: mailError });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteContacts = async (req, res) => {
  try {
    const q = "DELETE FROM contacts WHERE id = ?";
    const ID = req.params.id;
    db.query(q, [ID], (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}
