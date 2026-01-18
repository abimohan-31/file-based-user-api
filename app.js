import express from "express";
// import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>API Documentation</h1>
    <p>Welcome to the User API. Here are the available endpoints:</p>
    <ul>
      <li><strong>GET /api/users</strong>: Get all users</li>
      <li><strong>GET /api/users/:id</strong>: Get user by ID</li>
      <li><strong>POST /api/users</strong>: Create a user</li>
      <li><strong>PUT /api/users/:id</strong>: Update a user</li>
      <li><strong>DELETE /api/users/:id</strong>: Delete a user</li>
    </ul>
  `);
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}`)
);
