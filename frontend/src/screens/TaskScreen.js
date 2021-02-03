import { set } from "js-cookie";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsTask, saveTask } from "../actions/taskActions";

function TaskScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/signin";

  const taskDetails = useSelector((state) => state.taskDetails);
  const { loading, task, error } = taskDetails;

  const [title, setTitle] = useState("");

  const [steps, setSteps] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(detailsTask(props.match.params.id));
    } else {
      props.history.push(redirect);
    }
  }, [userInfo]);

  useEffect(() => {
    if (task) {
      setSteps(task.steps);
      setTitle(task.title);
    }
  }, [task]);

  useEffect(() => {
    if (steps) {
      
    }
  }, [steps]);

  const handleCheckbox = (e) => {
    const newSteps = steps.map((step) => ({ ...step }));
    const index = newSteps.map((step) => step._id).indexOf(e.target.name);
    newSteps[index].checked = !newSteps[index].checked;
    setSteps(newSteps);
    dispatch(
      saveTask({
        _id: task._id,
        title: task.title,
        steps: newSteps,
      })
    );
  };
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : title && steps ? (
        <div>
          <h3>
            <Link to="/profile">
              <button>Back</button>
            </Link>
            {title}
          </h3>
          <ul>
            {steps.map((step, i) => (
              <li key={i}>
                {step.name}
                <input
                  type="checkbox"
                  name={step._id}
                  checked={step.checked}
                  disabled={step.checked}
                  onChange={(e) => handleCheckbox(e)}
                ></input>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TaskScreen;
