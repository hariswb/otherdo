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

function taskListReducer(state = { tasks: [] }, action) {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_LIST_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function taskUserListReducer(state = { tasks: [] }, action) {
  switch (action.type) {
    case TASK_LIST_USER_REQUEST:
      return { loading: true };
    case TASK_LIST_USER_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_LIST_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function taskSaveReducer(state = { task: {} }, action) {
  switch (action.type) {
    case TASK_SAVE_REQUEST:
      return { loading: true };
    case TASK_SAVE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case TASK_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


function taskCloneReducer(state = { task: {} }, action) {
  switch (action.type) {
    case TASK_CLONE_REQUEST:
      return { loading: true };
    case TASK_CLONE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case TASK_CLONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function taskDetailsReducer(state = { task: {} }, action) {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { loading: true };
    case TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function taskDeleteReducer(state = { task: {} }, action) {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  taskListReducer,
  taskUserListReducer,
  taskDetailsReducer,
  taskSaveReducer,
  taskDeleteReducer,
  taskCloneReducer
};
