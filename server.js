const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const DB = "./users.json";

function readDB() {
  if (!fs.existsSync(DB)) return [];
  return JSON.parse(fs.readFileSync(DB));
}

function writeDB(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

// rejestracja
app.post("/api/register", (req, res) => {
  const { username, email } = req.body;

  const db = readDB();

  db.push({
    username,
    email,
    date: new Date().toLocaleString()
  });

  writeDB(db);

  res.json({ ok: true });
});

// pobieranie
app.get("/api/users", (req, res) => {
  res.json(readDB());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server działa");
});
