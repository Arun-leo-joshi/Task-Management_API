import mongoose from "mongoose";

const TaskSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxLength: 100
    },
    description: {
        type:String
    }, 
    status:{
        type:String,
        enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'],
        default: 'TODO'
    },
    deleted:{
        type:Boolean,
        default: false
    },
    priority: {
        type:String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        required: true
    }, 
    dueDate: {
        type: Date,
    }
},{timestamps: true});

export const Tasks=mongoose.model('Tasks',TaskSchema);