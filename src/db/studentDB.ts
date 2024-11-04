import mongoose,{Schema} from "mongoose";

interface Student{
    _id?:object;
    name:string;
    age:number;
    email:string;
    department:string;
}

const studentSchema=new Schema<Student>({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const StudentModel=mongoose.model<Student>('Student',studentSchema)

// export default StudentModel
export {Student,StudentModel}