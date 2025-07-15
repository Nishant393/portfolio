import { db } from "../config/db.js"


export const getInfo =  async (req,res)=>{
  try {
    const q = "SELECT * FROM portfolio.personal_info;"
    db.query(q,(err,data)=>{
      if(err) return res.json("something went wrong")
      return res.json(data)
    })
  } catch (error) {
    res.json(error)
  }
}

export const updateInfo = async (req, res) => {
  try {
    const q = `
      UPDATE portfolio.personal_info 
      SET 
        name = ?, 
        email = ?, 
        mobile = ?, 
        occupation = ?, 
        github = ?, 
        bio = ?, 
        linkedin = ?, 
        goal = ?
      WHERE id = ?
    `;

    const ID = req.params.id;

    console.log("BODY KEYS:", Object.keys(req.body));
    console.log("DATA:", req.body, "ID:", ID);

    const values = [
      req.body.name,
      req.body.email,
      req.body.mobile,
      req.body.occupation, // ✅ Corrected spelling here
      req.body.github,
      req.body.bio,
      req.body.linkedin,
      req.body.goal,
    ];

    db.query(q, [...values, ID], (err, data) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  } catch (error) {
    console.error("TRY-CATCH ERROR:", error);
    res.status(500).json(error);
  }
}
