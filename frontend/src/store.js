import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducers";
import { taskCloneReducer, taskDetailsReducer, taskListReducer, taskSaveReducer, taskUserListReducer } from "./reducers/taskReducer";


const userInfo = Cookie.getJSON("userInfo")||null
const initialState = { userSignin: { userInfo } };

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  taskSave : taskSaveReducer,
  taskUserList: taskUserListReducer,
  taskDetails: taskDetailsReducer,
  taskList: taskListReducer,
  taskClone: taskCloneReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
