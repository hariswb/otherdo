import Axios from "axios";
import {
  TASK_CLONE_FAIL,
  TASK_CLONE_REQUEST,
  TASK_CLONE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_USER_FAIL,
  TASK_LIST_USER_REQUEST,
  TASK_LIST_USER_SUCCESS,
  TASK_SAVE_FAIL,
  TASK_SAVE_REQUEST,
  TASK_SAVE_SUCCESS,
} from "../constants/taskConstants";

const listTask = () => async (dispatch) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST });
    const { data } = await Axios.get("/api/tasks");
    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_LIST_FAIL, payload: error.message });
  }
};

const listTaskUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_LIST_USER_REQUEST });

    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.post(
      "/api/tasks/user",
      {},
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: TASK_LIST_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_LIST_USER_FAIL, payload: error.message });
  }
};

const saveTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_SAVE_REQUEST, payload: task });
    const {
      userSignin: { userInfo },
    } = getState();

    if (!task._id) {
      const { data } = await Axios.post("/api/tasks", task, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: TASK_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put("/api/tasks", task, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: TASK_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: TASK_SAVE_FAIL, payload: error.message });
  }
};

const cloneTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_CLONE_REQUEST, payload: task });
    const {
      userSignin: { userInfo },
    } = getState();
    if (task.author_id !== userInfo._id && task.original) {
      const { data } = await Axios.post("/api/tasks/clone",task, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: TASK_CLONE_SUCCESS, payload: data });
    } else {
      dispatch({
        type: TASK_CLONE_FAIL,
        payload: "You cannot adopt your own task or clone of other task",
      });
    }
  } catch (error) {
    dispatch({ type: TASK_CLONE_FAIL, payload: error.message });
  }
};

const detailsTask = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST, payload: taskId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/tasks/" + taskId,
      { taskId: taskId },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: TASK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_DETAILS_FAIL, payload: error.message });
  }
};

const deleteTask = (taskId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: TASK_DELETE_REQUEST, payload: taskId });
    const { data } = await Axios.delete("/api/products/" + taskId, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
    });
    dispatch({ type: TASK_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: TASK_DELETE_FAIL, payload: error.message });
  }
};

export { listTask, listTaskUser, detailsTask, saveTask, cloneTask, deleteTask };
