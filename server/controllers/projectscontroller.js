import { db } from "../config/db.js"


export const getProjects = async (req, res) => {
  try {
    const q = "SELECT * FROM portfolio.projects;"
    db.query(q, (err, data) => {
      if (err) return res.json("something went wrong")
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}

export const addProjects = async (req, res) => {
  try {
    const {
      title,
      description,
      features,
      techStack,
      github,
      website,
      linkedin,
    } = req.body;

    const q = `
      INSERT INTO portfolio.projects 
      (title, description, features, techStack, github, website, linkedin) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      description,
      JSON.stringify(features),   // convert array to string
      JSON.stringify(techStack),  // convert array to string
      github,
      website,
      linkedin,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error", details: err });
      }
      return res.status(201).json({ message: "Project added", data });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const q = "DELETE FROM portfolio.projects WHERE id = ?";
    const ID = req.params.id;
    db.query(q, [ID], (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}

export const updateProject = async (req, res) => {
  try {
    const q = "UPDATE portfolio.projects SET `title` = ?, `description` = ?, `features` = ?, `techStack` = ? , `github` = ? , `website` = ? , `linkedin` = ? WHERE id = ?";
    const ID = req.params.id;
    const values = [
      req.body.title,
      req.body.description,
      req.body.features,
      req.body.techStack,
      req.body.github,
      req.body.website,
      req.body.linkedin,
    ]
    db.query(q, [...values, ID], (err, data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}