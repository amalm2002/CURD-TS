import express from 'express'
import { StudentModel } from '../db/studentDB'
import mongoose from 'mongoose'


//show the all details page

export const getAllStudents = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const allStudents = await StudentModel.find()
        res.render('student', { allStudents })
    } catch (error) {
        console.log("Error retrieving getAll-Students:", error);
        res.status(500).json("An error occurred while retrieving getAll-Students.");
    }
}

//Add student controller

export const addStudents = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, email, age, department } = req.body

        if (!name || !email || !age || !department) {
            res.status(400).json({ message: "Please provide all required fields." });
            return
        }

        const existingStudent = await StudentModel.findOne({ email });
        if (existingStudent) {
            res.status(400).json({ message: "Email already exists" });
            return
        }
        
        const newStudent = new StudentModel({ name, email, age, department })

        await newStudent.save()

        res.status(201).json({ message: "Student added successfully", student: newStudent });

    } catch (error) {
        console.log("Error retrieving add-Students:", error);
        res.status(500).json("An error occurred while retrieving add-Students.");

    }
}

//edit student page

export const editStudentsPage = async (req: express.Request, res: express.Response) => {
    try {
        const studentId = req.params.studentId

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            res.status(400).json({ message: "Invalid student ID format." });
            return;
        }

        const student = await StudentModel.findById(studentId);
        if (!student) {
            res.status(404).json({ message: "Student not found." });
            return;
        }
        res.render('editStudent', { student })

    } catch (error) {
        console.log("Error retrieving edit-StudentPage:", error);
        res.status(500).json("An error occurred while retrieving edit-StudentPage.");
    }
}

//edit student controller

export const editStudent = async (req: express.Request, res: express.Response) => {
    try {
        const studentId = req.params.studentId

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            res.status(400).json({ message: "Invalid student ID format." });
            return;
        }

        const { name, email, age, department } = req.body

        const updatedStudent = await StudentModel.findByIdAndUpdate(studentId, { name, age, email, department }, { new: true })

        if (!updatedStudent) {
            res.status(404).json({ message: "Student not found." });
            return
        }

        res.status(200).json({ message: "Student updated successfully!", student: updatedStudent });

    } catch (error) {
        console.log("Error retrieving edit-Student:", error);
        res.status(500).json("An error occurred while retrieving edit-Student.");
    }
}

//delete student controller

export const deleteStudent = async (req: express.Request, res: express.Response) => {
    try {
        const studentId = req.params.studentId

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            res.status(400).json({ message: "Invalid student ID format." });
            return;
        }

        const result = await StudentModel.findByIdAndDelete(studentId);

        if (!result) {
            res.status(404).json({ message: "Student not found." });
            return
        }

        res.status(200).json({ message: "Student deleted successfully." });

    } catch (error) {
        console.log("Error retrieving delete-Student:", error);
        res.status(500).json("An error occurred while retrieving delete-Student.");

    }
}