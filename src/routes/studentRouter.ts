import express from "express";
import {getAllStudents,addStudents,editStudentsPage,editStudent,deleteStudent} from "../controller/studentController";
const route=express.Router()

//Show the all Students
route.get('/',getAllStudents)

//Add Student Route
route.post('/addStudent',addStudents)

//Edit Student Route
route.get('/editStudentPage/:studentId',editStudentsPage)
route.put('/editStudent/:studentId',editStudent)

//Delete Student Route
route.delete('/deleteStudent/:studentId',deleteStudent)

export default route