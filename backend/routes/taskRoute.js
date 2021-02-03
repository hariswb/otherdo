import express from "express";
import Task from "../models/taskModel";
import { isAdmin, isAuth } from "../util";
import User from "../models/userModel";
const router = express.Router();

router.post("/user", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const taskUserList = await Task.find({
        _id: { $in: user.collected },
      });
      res.status(201).send(taskUserList);
    }
  } catch (error) {
    res.status(500).send({ message: "Error in getting user's list of task" });
  }
});

router.post("/:id", isAuth, async (req, res) => {
  try {
    const task = await Task.findById(req.body.taskId);
    if (task) {
      res.status(201).send(task);
    }
  } catch (error) {
    res.status(500).send({ message: "Error in getting a task" });
  }
});

router.post("/clone", isAuth, async (req, res) => {
  console.log(await req.user)
  // try {
  //   console.log(req.user)

  //   // const user = await User.findById(req.user._id);
  //   // const taskToClone = await Task.findById(req.body.task._id)
  //   // console.log(req.user._id)
  //   // console.log(req.body)
  //   // res.send("oi")
  //   // if (user && taskToClone) {
  //   //   console.log(taskToClone.user._id)
  //   //   console.log(user._id)
  //     // const task = new Task({
  //     //   title: req.body.title,
  //     //   steps: req.body.steps.map((s) => ({ name: s, checked: false })),
  //     //   user: user._id,
  //     //   author_id: user._id,
  //     //   original: true,
  //     // });
  //     // const newTask = await task.save();
  //     // user.collected.push(newTask);
  //     // await user.save();
  //     // if (newTask) {
  //       // return res.status(201).send({ message: "New task created" });
  //     // }
  //   // }
  // } catch (error) {
  //   res.status(500).send({ message: "Error in creating task" });
  // }
});

router.post("/", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const task = new Task({
        title: req.body.title,
        steps: req.body.steps.map((s) => ({ name: s, checked: false })),
        user: user._id,
        author_id: user._id,
        original: true,
      });
      const newTask = await task.save();
      user.collected.push(newTask);
      await user.save();
      if (newTask) {
        return res.status(201).send({ message: "New task created" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Error in creating task" });
  }
});

router.put("/", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const task = await Task.findById(req.body._id);
    if (user && task) {
      task.title = req.body.title;
      task.steps = req.body.steps;
      
      const updatedTask = await task.save();
      if(updatedTask){
      return res.status(201).send({ message: "New task created" });
        
      }

    }
  } catch (error) {
    res.status(500).send({ message: "Error in creating task" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allTasks = await Task.find({
      original:true
    })
    res.send(allTasks);
  } catch (error) {
    res.status(500).send({ message: "Error getting all tasks" });
  }
});

router.get("/deletealltasks", async (req, res) => {
  try {
    await Task.deleteMany({});
    
    res.send("oi");
  } catch (error) {
    res.status(500).send({ message: "Error deleting all tasks" });
  }
});

export default router;
