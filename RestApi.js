const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3001;


// Student data
let students = [
    {
        id: 1,
        name: "Arjun",
        email: "arjun@gmail.com",
        course: "MCA",
        semester: 3
    },
    {
        id: 2,
        name: "Aarav",
        email: "aarav@gmail.com",
        course: "MCA",
        semester: 3
    },
    {
        id: 3,
        name: "Vihaan",
        email: "vihaan@gmail.com",
        course: "MCA",
        semester: 3
    }
];


// Home
app.get('/', (req, res) => {
    res.send("STUDENTS API");
});


// GET - Get all students
app.get('/students', (req, res) => {

    res.status(200).json(students);

});


// GET - Get student by ID
app.get('/students/:id', (req, res) => {

    let id = parseInt(req.params.id);

    for (let s of students) {

        if (s.id === id) {

            return res.status(200).json(s);

        }

    }

    return res.status(404).json({
        message: "Student not found"
    });

});


// POST - Add new student
app.post('/students', (req, res) => {

    let newStudent = {

        id: students.length + 1,
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        semester: req.body.semester

    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });

});


// PUT - Update student
app.put('/students/:id', (req, res) => {

    let id = parseInt(req.params.id);

    for (let s of students) {

        if (s.id === id) {

            s.name = req.body.name;
            s.email = req.body.email;
            s.course = req.body.course;
            s.semester = req.body.semester;

            return res.status(200).json({
                message: "Data Updated Successfully",
                student: s
            });

        }

    }

    return res.status(404).json({
        message: "Student not found"
    });

});


// DELETE - Delete student
app.delete('/students/:id', (req, res) => {

    let id = parseInt(req.params.id);

    for (let i = 0; i < students.length; i++) {

        if (students[i].id === id) {

            students.splice(i, 1);

            return res.status(200).json({
                message: "Student deleted successfully"
            });

        }

    }

    return res.status(404).json({
        message: "Student not found"
    });

});


// Start server
app.listen(PORT, () => {

    console.log("Server running at http://localhost:" + PORT);

});