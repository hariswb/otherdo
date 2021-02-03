import mongoose from "mongoose";

const stepSchema = mongoose.Schema({
  name:{type:String},
  checked:{type:Boolean, default:false}
})

const taskSchema = mongoose.Schema(
  {
    title: { type: String },
    steps: [stepSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    author_id: { type: String },
    original: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;
