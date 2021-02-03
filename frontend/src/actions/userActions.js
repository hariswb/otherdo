import Cookie from "js-cookie";
import Axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS
} from "../constants/userConstants";

const signin = (name, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { name, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", {
      name,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data), { expires: 1 });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const register = (name, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data), { expires: 1 });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

export { register, signin };
