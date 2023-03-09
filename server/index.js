const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddatabase"
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Get
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM documents"
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(result)
  })
})

// Search
app.get("/api/search", (req, res) => {
  const searchQuery = req.query.q
  const sqlSearch = "SELECT * FROM documents WHERE title LIKE ? OR content LIKE ? OR author LIKE ?"
  const params = [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`]
  db.query(sqlSearch, params, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(result)
  })
})

// Insert
app.post("/api/insert", (req, res) => {
  const title = req.body.title
  const author = req.body.author
  const date = req.body.date
  const content = req.body.content

  const sqlInsert = "INSERT INTO documents (title, author, date, content) VALUES (?,?,?,?);"
  db.query(sqlInsert, [title, author, date, content], (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    console.log(result)
  })
})

app.listen(3001, () => {
  console.log("running on port 3001")
})
