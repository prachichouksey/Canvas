import axios from "axios";
import cookie from "react-cookies";
import setAuthToken from "../utils/setAuthToken";
import rooturl from "../components/config/urlConfig";

import {
  OPEN_ACCOUNT_HOVER,
  OPEN_COURSE_HOVER,
  CLOSE_ACCOUNT_HOVER,
  CLOSE_COURSE_HOVER,
  GET_ERRORS,
  SET_CURRENT_USER,
  REMOVE_USER,
  GET_USER_PROFILE,
  CLEAR_USER_PROFILE,
  OPEN_USER_INBOX,
  CANVAS_CLOSE_ERROR,
  CANVAS_OPEN_ERROR
} from "./actions";
export function openAccountHover() {
  return {
    type: OPEN_ACCOUNT_HOVER
  };
}

export function openCourseHover() {
  return {
    type: OPEN_COURSE_HOVER
  };
}

export function closeAccountHover() {
  return {
    type: CLOSE_ACCOUNT_HOVER
  };
}

export function closeCourseHover() {
  return {
    type: CLOSE_COURSE_HOVER
  };
}

export function openInbox() {
  return {
    type: OPEN_USER_INBOX
  };
}

export const signUpUser = (userData, history) => dispatch => {
  axios.defaults.withCredentials = true;
  var header = { "Content-Type": "application/JSON" };
  axios
    .post("http://" + rooturl + ":4000/login/signup", userData, header)
    .then(response => {
      console.log("Status Code : ", response.status);
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const logInUser = (userData, history) => {
  axios.defaults.withCredentials = true;
  var header = {
    "Content-Type": "application/JSON"
  };

  axios
    .post("http://" + rooturl + ":4000/login/signin", userData, header)
    .then(response => {
      if (response.status === 200) {
        let data = response.data;
        console.log(data);
        const { token } = data;
        localStorage.setItem("type", data.type);
        localStorage.setItem("token", token);
        document.cookie = "userid=" + data.userId;
        setAuthToken(token);
        let interval = setInterval(_ => {
          if (cookie.load("userid")) {
            history.push("/canvas");
            clearInterval(interval);
          }
        }, 100);
        //dispatch(setCurrentUser(data.userId));
      }
    });
  return {
    type: "djhfkjshf"
  };
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};

export const setCurrentUser = userid => {
  return {
    type: SET_CURRENT_USER,
    payload: userid
  };
};

export const removeUser = userid => {
  return {
    type: REMOVE_USER
  };
};

export const logOutUser = history => dispatch => {
  localStorage.removeItem("type");
  localStorage.removeItem("token");
  cookie.remove("userid");
  dispatch(removeUser());
  history.push("/login");
};

export const getUserProfile = () => dispatch => {
  let userid = cookie.load("userid");
  axios
    .get("http://" + rooturl + ":4000/account/profile", {
      params: { userid: userid }
    })
    .then(response => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: response.data
      });
    })
    .catch(
      dispatch({
        type: GET_USER_PROFILE,
        payload: {}
      })
    );
};

export const clearUserProfile = () => {
  return {
    type: CLEAR_USER_PROFILE
  };
};

export const editUserProfile = userData => dispatch => {
  axios
    .put("http://" + rooturl + ":4000/account/profile", userData)
    .then(res => console.log("res"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const closeError = () => ({
  type: CANVAS_CLOSE_ERROR
});

export const openError = () => ({
  type: CANVAS_OPEN_ERROR
});
