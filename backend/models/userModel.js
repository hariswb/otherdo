import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false},
    collected:[{type:mongoose.Schema.Types.ObjectId,ref:'Task'}]
})

const userModel = mongoose.model('User',userSchema)

export default userModel