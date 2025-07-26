import express from "express"
import { db } from "./config/db.js"
import personalInfoRoute from "./routes/personalInfoRoute.js"
import projectsRoute from "./routes/projectsRoute.js"
import skillsRoute from "./routes/skillsRoute.js"
import contactsRoute from "./routes/contactRoute.js"
import cors from "cors"
import dotenv from "dotenv";



const app = express()




try {
    dotenv.config({ path: "./.env" });
} catch (error) {
    console.error("Failed to load environment variables:", error);
    process.exit(1); // Exit process if .env fails
}

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());


app.get("/", (req, res) => {
    const q = "SELECT * FROM new_schema.new_table;"
    db.query(q, (err, data) => {
        if (err) return res.json("something went wrong")
        return res.json(data)
    })
})

app.use("/me", personalInfoRoute)
app.use("/projects", projectsRoute)
app.use("/skills", skillsRoute)
app.use("/contacts", contactsRoute)

app.listen( process.env.PORT, () => {
    console.log("server is run on port 5000", process.env.PORT)
})