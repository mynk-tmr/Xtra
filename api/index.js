import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(8000, () => {
  console.log("Started at port 8000");
});
