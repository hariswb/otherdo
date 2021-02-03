import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listTaskUser } from "../actions/taskActions";
import { taskUserListReducer } from "../reducers/taskReducer";

function ProfileScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/signin";
  const dispatch = useDispatch();

  const taskUserList = useSelector((state) => state.taskUserList);
  const { loading, tasks, error } = taskUserList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listTaskUser());
    } else {
      props.history.push(redirect);
    }
  }, [userInfo]);

  return (
    <div>
      <Link to="/create">
        <button>Create Task</button>
      </Link>
      {userInfo && tasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <Link to={"/tasks/" + task._id}>{task.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfileScreen;
