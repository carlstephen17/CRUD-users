import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 1234;

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@mxmxyzptlk3",
    database: "crud"
});

db.connect((error) => {
    if (error) {
        console.error("Database connection failed:", error);
        return;
    }
    console.log("Database Connected!");
});

// GET all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json(result);
    });
});

// GET a single user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json(result[0] || null);
    });
});

// CREATE a new user
app.post('/users', (req, res) => {
    const { name, email, phone } = req.body;
    const sql = 'INSERT INTO users(name, email, phone) VALUES(?,?,?)';
    db.query(sql, [name, email, phone], (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ message: "User created!", id: result.insertId });
    });
});

// UPDATE a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
    db.query(sql, [name, email, phone, id], (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ message: "User updated!", affectedRows: result.affectedRows });
    });
});

// DELETE all user
app.delete('/users', (req, res) => {
    const sql = 'TRUNCATE TABLE users'; // Truncate deletes all rows and resets auto increment
    db.query(sql, (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ message: "All users deleted and ID reset!" });
    });
});


// DELETE a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ message: "User deleted!", affectedRows: result.affectedRows });
    });
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});

