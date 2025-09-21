const fs = require("fs");
const filePath = require("../data/users.json");
const users = require("./api/users.json");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (!data) return res.status(404).json({ error: "User not found" });
});

fs.writeFile(filePath, content, "utf8", (err) => {
  if (err) {
    return res.status(500).send("Error writing file.");
  }
  res.status(200).send("User added successfully.");
});

exports.getAllusers = (req, res) => {
  res.json(filePath);
};
exports.getuserbyID = (req, res) => {
  const userID = req.params.id;
  const userName = req.params.name;
  const userEmail = req.params.email;
  const user = { id: userID, name: userName, email: userEmail };
  res.json(users.push(user));
};

exports.createUser = (req, res) => {
  const newUserID = req.params.id;
  const newUserName = req.params.name;
  const newUserEmail = req.params.email;
  const newUser = { id: newUserID, name: newUserName, email: newUserEmail };
  res.json(users.push(newUser));

  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      return res.status(500).send("Error writing file.");
    }
    res.status(200).send("User added successfully.");
  });
};

exports.updateUser = (req, res) => {
  const existingUserID = req.params.id;
  const existingUserEmail = req.params.email;
  const existingUser = users.find(
    (users) => users.newUserEmail === existingUserEmail
  );
  res.json(existingUser);

  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      return res.status(500).send("Error at updating.");
    }
    res.status(200).send("User updated successfully.");
  });
};

exports.deleteUser = (req, res) => {
  const existingUserID = req.params.id;
  const filteredUser = users.filter(
    (users) => users.newUserID === existingUserID
  );
  res.json(existingUser);

  fs.writeFile(users, JSON.stringify(filteredUser), (err, data) => {
    if (err) return res.json(err);
    return res.json(filteredUser);
  });
};
