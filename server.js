const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./lab_management.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.serialize(() => {
        // Admin table
        db.run(`CREATE TABLE IF NOT EXISTS ADMIN (
            A_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            A_EMAIL TEXT NOT NULL UNIQUE,
            A_PW TEXT NOT NULL
        )`);

        // Inventory table
        db.run(`CREATE TABLE IF NOT EXISTS INVENTORY (
            I_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            E_TYPE TEXT NOT NULL,
            QUANTITY INTEGER NOT NULL
        )`);

        // Equipment table
        db.run(`CREATE TABLE IF NOT EXISTS EQUIPMENT (
            E_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            E_TYPE TEXT NOT NULL,
            E_DESC TEXT
        )`);

        // Staff table
        db.run(`CREATE TABLE IF NOT EXISTS STAFF (
            SF_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            SF_NAME TEXT NOT NULL,
            SF_EMAIL TEXT NOT NULL,
            SF_MOBILE TEXT,
            SF_ROLE TEXT
        )`);

        // Roles table
        db.run(`CREATE TABLE IF NOT EXISTS ROLES (
            NAME TEXT PRIMARY KEY,
            STRENGTH TEXT
        )`);

        // Student table
        db.run(`CREATE TABLE IF NOT EXISTS STUDENT (
            S_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            S_NAME TEXT NOT NULL,
            S_EMAIL TEXT NOT NULL,
            S_MOBILE TEXT,
            S_DEPT TEXT
        )`);

        // Test table
        db.run(`CREATE TABLE IF NOT EXISTS TEST (
            T_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            S_ID INTEGER NOT NULL,
            SF_ID INTEGER,
            T_TYPE TEXT NOT NULL,
            DATE TEXT NOT NULL,
            RESULT TEXT,
            FOREIGN KEY (S_ID) REFERENCES STUDENT(S_ID),
            FOREIGN KEY (SF_ID) REFERENCES STAFF(SF_ID)
        )`);

        // Report table
        db.run(`CREATE TABLE IF NOT EXISTS REPORT (
            R_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            S_ID INTEGER,
            T_ID INTEGER,
            R_TYPE TEXT,
            R_DATE TEXT NOT NULL,
            R_DESC TEXT,
            FOREIGN KEY (S_ID) REFERENCES STAFF(SF_ID),
            FOREIGN KEY (T_ID) REFERENCES TEST(T_ID)
        )`);

        console.log('Database tables initialized');
    });
}

// Generic CRUD operations
function getAll(table, res) {
    db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
}

function getById(table, idColumn, id, res) {
    db.get(`SELECT * FROM ${table} WHERE ${idColumn} = ?`, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Not found' });
        } else {
            res.json(row);
        }
    });
}

function insert(table, data, res) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    db.run(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, message: 'Created successfully' });
        }
    });
}

function update(table, idColumn, id, data, res) {
    const sets = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    db.run(`UPDATE ${table} SET ${sets} WHERE ${idColumn} = ?`, values, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Not found' });
        } else {
            res.json({ message: 'Updated successfully' });
        }
    });
}

function deleteRecord(table, idColumn, id, res) {
    db.run(`DELETE FROM ${table} WHERE ${idColumn} = ?`, [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Not found' });
        } else {
            res.json({ message: 'Deleted successfully' });
        }
    });
}

// Admin routes
app.get('/api/admin', (req, res) => getAll('ADMIN', res));
app.get('/api/admin/:id', (req, res) => getById('ADMIN', 'A_ID', req.params.id, res));
app.post('/api/admin', (req, res) => insert('ADMIN', req.body, res));
app.put('/api/admin/:id', (req, res) => update('ADMIN', 'A_ID', req.params.id, req.body, res));
app.delete('/api/admin/:id', (req, res) => deleteRecord('ADMIN', 'A_ID', req.params.id, res));

// Inventory routes
app.get('/api/inventory', (req, res) => getAll('INVENTORY', res));
app.get('/api/inventory/:id', (req, res) => getById('INVENTORY', 'I_ID', req.params.id, res));
app.post('/api/inventory', (req, res) => insert('INVENTORY', req.body, res));
app.put('/api/inventory/:id', (req, res) => update('INVENTORY', 'I_ID', req.params.id, req.body, res));
app.delete('/api/inventory/:id', (req, res) => deleteRecord('INVENTORY', 'I_ID', req.params.id, res));

// Equipment routes
app.get('/api/equipment', (req, res) => getAll('EQUIPMENT', res));
app.get('/api/equipment/:id', (req, res) => getById('EQUIPMENT', 'E_ID', req.params.id, res));
app.post('/api/equipment', (req, res) => insert('EQUIPMENT', req.body, res));
app.put('/api/equipment/:id', (req, res) => update('EQUIPMENT', 'E_ID', req.params.id, req.body, res));
app.delete('/api/equipment/:id', (req, res) => deleteRecord('EQUIPMENT', 'E_ID', req.params.id, res));

// Staff routes
app.get('/api/staff', (req, res) => getAll('STAFF', res));
app.get('/api/staff/:id', (req, res) => getById('STAFF', 'SF_ID', req.params.id, res));
app.post('/api/staff', (req, res) => insert('STAFF', req.body, res));
app.put('/api/staff/:id', (req, res) => update('STAFF', 'SF_ID', req.params.id, req.body, res));
app.delete('/api/staff/:id', (req, res) => deleteRecord('STAFF', 'SF_ID', req.params.id, res));

// Roles routes
app.get('/api/roles', (req, res) => getAll('ROLES', res));
app.get('/api/roles/:name', (req, res) => getById('ROLES', 'NAME', req.params.name, res));
app.post('/api/roles', (req, res) => insert('ROLES', req.body, res));
app.put('/api/roles/:name', (req, res) => update('ROLES', 'NAME', req.params.name, req.body, res));
app.delete('/api/roles/:name', (req, res) => deleteRecord('ROLES', 'NAME', req.params.name, res));

// Student routes
app.get('/api/student', (req, res) => getAll('STUDENT', res));
app.get('/api/student/:id', (req, res) => getById('STUDENT', 'S_ID', req.params.id, res));
app.post('/api/student', (req, res) => insert('STUDENT', req.body, res));
app.put('/api/student/:id', (req, res) => update('STUDENT', 'S_ID', req.params.id, req.body, res));
app.delete('/api/student/:id', (req, res) => deleteRecord('STUDENT', 'S_ID', req.params.id, res));

// Test routes
app.get('/api/test', (req, res) => getAll('TEST', res));
app.get('/api/test/:id', (req, res) => getById('TEST', 'T_ID', req.params.id, res));
app.post('/api/test', (req, res) => insert('TEST', req.body, res));
app.put('/api/test/:id', (req, res) => update('TEST', 'T_ID', req.params.id, req.body, res));
app.delete('/api/test/:id', (req, res) => deleteRecord('TEST', 'T_ID', req.params.id, res));

// Report routes
app.get('/api/report', (req, res) => getAll('REPORT', res));
app.get('/api/report/:id', (req, res) => getById('REPORT', 'R_ID', req.params.id, res));
app.post('/api/report', (req, res) => insert('REPORT', req.body, res));
app.put('/api/report/:id', (req, res) => update('REPORT', 'R_ID', req.params.id, req.body, res));
app.delete('/api/report/:id', (req, res) => deleteRecord('REPORT', 'R_ID', req.params.id, res));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});