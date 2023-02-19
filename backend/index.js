import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vhiz1234",
    database: "test"
})
app.use(express.json())
app.use(cors())
const Port = process.env.PORT || 3001

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    })
})

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = "SELECT * FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    })
})

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, price) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(400).json(err)

        return res.status(201).json("Book has been created sucessful.")
    })
})

app.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json("Book has been deleted sucessful.")
    })
})

app.put('/books/:id', async (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json("Book has been updated sucessful.")
    })
})

app.listen(Port, (err) => {
    if (err) {
        console.log(`Port ${Port} has an error`)
    } else {
        console.log(`started at Port ${Port}`)
    }
})