import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/users.json");

function readUsers() {
  const data = readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeUsers(users) {
  writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export const getAllUsers = (req, res) => {
  const users = readUsers();
  res.json(users);
};

export const getUserById = (req, res) => {
  const users = readUsers();
  const user = users.find((p) => p.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });
  res.send(user);
};

export const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const users = readUsers();

  const emailCheck = users.find((user) => user.email === email);
  if (emailCheck) return res.status(404).json({ error: "Email already exit" });

  // Create new user
  const newUser = {
    id:
      users.length > 0 ? Math.max(...users.map((u) => parseInt(u.id))) + 1 : 1,
    name,
    email,
  };

  users.push(newUser);

  writeUsers(users);

  res.status(201).json({ message: "User added Successfully" });
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const users = readUsers();

  const userId = users.find((user) => user.id === id);
  if (!userId) {
    return res.status(400).json({ error: "Couldn't find the user " });
  }

  const emailCheck = users.find((user) => user.email === email);
  if (!emailCheck) {
    return res.status(400).json({ error: "Couldn't find the user " });
  }

  const update = await users.find(id, req.body);

  users.push(update);

  writeUsers(users);

  res.status(201).json({ message: "User updated Successfully" });
};

export const deleteUser = (req, res) => {
  const users = readUsers();

  const requestedId = parseInt(req.params.id);
  console.log(typeof requestedId);

  const confirmation = users.find((user) => user.id === requestedId);
  if (!confirmation) return res.status(404).json({ error: "user not found" });

  const deletingUser = users.filter((user) => user.id !== requestedId);
  writeUsers(deletingUser);

  res.status(201).json({ message: "User deleted Successfully" });
};
