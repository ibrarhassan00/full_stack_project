import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import connectMongoDatabase from "./config/db.js";



dotenv.config();

connectMongoDatabase();

const PORT = process.env.PORT || 8080;

const app = express()
app.use(express.json());
app.use(cors());






app.use('/auth', authRoutes); // <- NEW LINE

app.use((req, res) => {
  res.status(404).send("Page not found");
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})