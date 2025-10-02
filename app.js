import express from "express";
// import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Express test");
// });

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}`)
);
