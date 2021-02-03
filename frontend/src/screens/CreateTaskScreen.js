import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {listTaskUser, saveTask} from "../actions/taskActions"
function CreateTaskScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/signin";

  const taskSave = useSelector(state => state.taskSave)

  let {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = taskSave

  const [saved, setSaved] = useState(false)

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState([]);

  const step = useRef();

  useEffect(() => {
    if (!userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, step]);

  useEffect(()=>{
    if(successSave && saved){
        dispatch(listTaskUser());
        props.history.push("/profile")
        setSaved(false)
    }
  },[successSave])

  const submitHandler = () => {
    dispatch(saveTask({
      title: title,
      steps: steps
    }))
    setSaved(true)
  };

  const addStep = () => {
    if (step.current.value.length > 0) {
      setSteps([...steps, step.current.value]);
    }
    step.current.value = null;
    step.current.focus();
  };

  const removeStep = (i) => {
    const newSteps = steps.slice(0, i).concat(steps.slice(i + 1, steps.length));
    setSteps(newSteps);
  };
  if (userInfo) {
    return (
      <div>
        <li>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </li>
        {steps.map((s, i) => (
          <li key={i}>
            {s}
            <button onClick={() => removeStep(i)}>del</button>
          </li>
        ))}
        <li>
          <input
            type="text"
            ref={step}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addStep();
              }
            }}
          ></input>
          <button onClick={() => addStep()}>Add</button>
        </li>
        <li>
          <button onClick={() => submitHandler()}>Create</button>
        </li>
      </div>
    );
  }
}

export default CreateTaskScreen;
