import { db } from "../config/db.js"


export const getSkills = async (req, res) => {
  try {
    const q = "SELECT * FROM portfolio.skills;"
    db.query(q, (err, data) => {
      if (err) return res.json("something went wrong")
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}

export const addSkills = async (req, res) => {
  try {
    const {
      name,
      description
    } = req.body;

    const q = `
      INSERT INTO portfolio.skills 
      (name, description) 
      VALUES (?, ?)
    `;

    const values = [
      name,
      description
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error", details: err });
      }
      return res.status(201).json({ message: "skills added", data });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const deleteSkills = async (req, res) => {
  try {
    const q = "DELETE FROM portfolio.skills WHERE id = ?";
    const ID = req.params.id;
    db.query(q, [ID], (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}

export const updateSkills = async (req, res) => {
  try {
    const q = "UPDATE portfolio.skills SET `name` = ?, `description` = ? WHERE id = ?";
    const ID = req.params.id;
    const values = [
      req.body.name,
      req.body.description,
    ]
    db.query(q, [...values, ID], (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}