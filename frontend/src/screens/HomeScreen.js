import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cloneTask, listTask } from "../actions/taskActions";
import { taskListReducer } from "../reducers/taskReducer";

function HomeScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/signin";
  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.taskList);
  const { loading, tasks, error } = taskList;

  const [previewStatus, setPreviewStatus] = useState({});

  useEffect(() => {
    if (userInfo) {
      dispatch(listTask());
    } else {
      props.history.push(redirect);
    }
  }, [userInfo]);

  useEffect(() => {
    if (tasks) {
      const newPreviewStatus = {};
      tasks.forEach((task) => {
        newPreviewStatus[task._id] = false;
        setPreviewStatus(newPreviewStatus);
      });
      setPreviewStatus(newPreviewStatus);
    }
  }, [tasks]);

  const handlePreview = (task_id) => {
    const newPreviewStatus = { ...previewStatus };
    Object.keys(newPreviewStatus).forEach((key) => {
      newPreviewStatus[key] = false;
    });
    newPreviewStatus[task_id] = true;
    setPreviewStatus(newPreviewStatus);
  };

  const handleAdopt = (task_id) => {
    dispatch(cloneTask(tasks.filter((task) => task._id === task_id)[0]));
  };

  return (
    <div>
      {tasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} onClick={() => handlePreview(task._id)}>
              {task.title}
              <div className={previewStatus[task._id] ? "show" : "hide"}>
                {task.steps && (
                  <ul>
                    {task.steps.map((step) => (
                      <li>{step.name}</li>
                    ))}
                    <li>
                      <button onClick={() => handleAdopt(task._id)}>
                        Adopt!
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomeScreen;
