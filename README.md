# Laboratory Management System

A complete web-based Laboratory Management System with CRUD operations for managing lab resources, staff, students, tests, and reports.

## Features

- **Admin Management**: Manage system administrators
- **Inventory Management**: Track laboratory inventory items
- **Equipment Management**: Manage laboratory equipment
- **Staff Management**: Handle staff records and roles
- **Role Management**: Define and assign roles
- **Student Management**: Maintain student information
- **Test Management**: Record and track student tests
- **Report Management**: Generate and manage reports
- **Data Persistence**: All data is stored in SQLite database

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite3

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## Installation Steps

### Step 1: Download/Clone the Project

Create a new folder for your project:
```bash
mkdir laboratory-management-system
cd laboratory-management-system
```

### Step 2: Create Project Structure

Create the following folder structure:
```
laboratory-management-system/
├── public/
│   └── index.html
├── server.js
└── package.json
```

### Step 3: Create Files

1. **Create `package.json`** in the root directory with the provided content

2. **Create `server.js`** in the root directory with the provided backend code

3. **Create `public` folder** in the root directory

4. **Create `index.html`** inside the `public` folder with the provided frontend code

### Step 4: Install Dependencies

Open your terminal/command prompt in the project root directory and run:

```bash
npm install
```

This will install all required dependencies:
- express (web server framework)
- sqlite3 (database)
- cors (cross-origin resource sharing)
- nodemon (auto-restart server during development)

### Step 5: Start the Server

Run the following command:

```bash
npm start
```

Or for development mode (auto-restart on changes):

```bash
npm run dev
```

You should see:
```
Connected to SQLite database
Database tables initialized
Server running on http://localhost:3000
```

### Step 6: Access the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the Laboratory Management System interface!

## How to Use

### Adding Data

1. Click on any tab (Admin, Inventory, Equipment, etc.)
2. Fill in the form fields
3. Click "Save" button
4. The data will appear in the table below

### Updating Data

1. Click the "Edit" button on any row in the table
2. The form will be populated with the existing data
3. Modify the fields as needed
4. Click "Save" button

### Deleting Data

1. Click the "Delete" button on any row
2. Confirm the deletion
3. The record will be removed from the database

### Viewing Data

- All data is automatically loaded when you switch between tabs
- The data persists even after refreshing the page (stored in SQLite database)

## Database

The application uses SQLite database which creates a file named `lab_management.db` in your project root directory. This file contains all your data.

### ER Diagram
<img src="https://i.postimg.cc/CKYkS30L/er.jpg
" alt="ER Diagram" width="600">

### Database Schema

The database includes the following tables based on the ER diagram:
- ADMIN (A_ID, A_EMAIL, A_PW)
- INVENTORY (I_ID, E_TYPE, QUANTITY)
- EQUIPMENT (E_ID, E_TYPE, E_DESC)
- STAFF (SF_ID, SF_NAME, SF_EMAIL, SF_MOBILE, SF_ROLE)
- ROLES (NAME, STRENGTH)
- STUDENT (S_ID, S_NAME, S_EMAIL, S_MOBILE, S_DEPT)
- TEST (T_ID, S_ID, SF_ID, T_TYPE, DATE, RESULT)
- REPORT (R_ID, S_ID, T_ID, R_TYPE, R_DATE, R_DESC)

## API Endpoints

The backend provides RESTful API endpoints for each entity:

### Format: `/api/{entity}`

**Available entities**: admin, inventory, equipment, staff, roles, student, test, report

**Operations**:
- `GET /api/{entity}` - Get all records
- `GET /api/{entity}/:id` - Get single record
- `POST /api/{entity}` - Create new record
- `PUT /api/{entity}/:id` - Update record
- `DELETE /api/{entity}/:id` - Delete record

## UI Snapshots
<img src="https://i.postimg.cc/fbKXL8WW/snap1.png" alt="ER Diagram" width="600">
<img src="https://i.postimg.cc/3wBpRtrJ/snap2.png" alt="ER Diagram" width="600">

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, modify the PORT variable in `server.js`:
```javascript
const PORT = 3001; // Change to any available port
```

### Database Issues

If you encounter database errors:
1. Stop the server (Ctrl+C)
2. Delete the `lab_management.db` file
3. Restart the server - it will create a fresh database

### Dependencies Not Installing

Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

## Project Structure

```
laboratory-management-system/
├── public/
│   └── index.html          # Frontend HTML/CSS/JS
├── server.js               # Backend API server
├── package.json            # Project dependencies
├── lab_management.db       # SQLite database (created automatically)
└── node_modules/           # Installed packages (created automatically)
```

## For Your DBMS Project Submission

### What to Submit:

1. **Source Code**: All project files (server.js, index.html, package.json)
2. **Database File**: lab_management.db (with sample data)
3. **Documentation**: This README file
4. **Screenshots**: Take screenshots of:
   - The main interface
   - Each CRUD operation (Create, Read, Update, Delete)
   - Database tables with data

### Running During Presentation:

1. Open terminal and navigate to project folder
2. Run `npm start`
3. Open browser to `http://localhost:3000`
4. Demonstrate CRUD operations on each entity

## Notes

- The UI is intentionally kept clean and simple, suitable for a college project
- All data operations are performed through REST API
- Data persistence is handled by SQLite database
- The application supports all relationships shown in the ER diagram
- Foreign key relationships are maintained in the database

## License

This project is created for educational purposes (DBMS Practical Project).

---

*Created for DBMS Practical Project* <br>
*Authors*: Sauvik Das, Akash Adhya <br>
*Date*: 14th November, 2025