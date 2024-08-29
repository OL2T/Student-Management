import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
// console.log(app);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ Message: "Error in fetching data server" });
    } else {
      return res.json(result);
    }
  });
});

app.post("/students", (req, res) => {
  const { name, email } = req.body;

  // Query to check if email already exists
  const checkEmailSql = "SELECT * FROM students WHERE Email = ?";
  db.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      return res.json({ Message: "Error in checking email server" });
    }
    console.log(result);
    if (result.length > 0) {
      // Email already exists
      return res.json({ Message: "Email already in use" });
    } else {
      // Proceed to insert the new student
      const insertSql = "INSERT INTO students (`Name`, `Email`) VALUES (?)";
      const values = [name, email];
      db.query(insertSql, [values], (err, result) => {
        if (err) {
          return res.json({ Message: "Error in inserting data server" });
        } else {
          return res.json({ Message: "Data inserted successfully" });
        }
      });
    }
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
