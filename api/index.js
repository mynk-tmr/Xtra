import express from "express";
import cors from "cors";
import "./database";

const app = express();
app.use(cors());
app.use(express.json()); //to recognise request body as JSON
app.use(express.urlencoded({ extended: true })); //to allow nested object creation from query strings

app.get("/api/", async (req, res) => {
  res.json({
    message: "Bun + Vite",
  });
});

app.listen(8000, () => {
  console.log("Visit http://localhost:8000/api");
});
