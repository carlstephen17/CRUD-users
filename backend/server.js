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

db.connect((err) => {
    if (err) return console.error("Database connection failed:", err);
    console.log("Database Connected!");
});

// GET all users sorted by ID ascending
app.get('/users', (req, res) => {
    const sql = `
        SELECT u.id, u.name, u.email, u.phone, d.id as departmentID, d.name AS department
        FROM users u
        JOIN departments d ON u.department_id = d.id
        ORDER BY u.id
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});


// GET single user by ID 
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT u.id, u.name, u.email, u.phone, d.name AS department
        FROM users u
        JOIN departments d ON u.department_id = d.id
        WHERE u.id = ?
    `;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0] || null);
    });
});

// CREATE a user
app.post('/users', (req, res) => {
    const { name, email, phone, department_id } = req.body;
    const sql = 'INSERT INTO users(name, email, phone, department_id) VALUES(?,?,?,?)';
    db.query(sql, [name, email, phone, department_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User created!", id: result.insertId });
    });
});

// UPDATE a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, department_id } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, phone = ?, department_id = ? WHERE id = ?';
    db.query(sql, [name, email, phone, department_id, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User updated!", affectedRows: result.affectedRows });
    });
});

// DELETE single user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User deleted!", affectedRows: result.affectedRows });
    });
});

// DELETE all users
app.delete('/users', (req, res) => {
    const sql = 'TRUNCATE TABLE users';
    db.query(sql, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "All users deleted and ID reset!" });
    });
});

// GET all departments
app.get('/departments', (req, res) => {
    const sql = 'SELECT * FROM departments ORDER BY id';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});
