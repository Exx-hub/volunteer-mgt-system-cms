import axios from "axios";
import { config } from "../config";
// import { UserProfile } from "../utility";

const BASE_URL = config.BASE_URL;

const Admin = {
  login: (username, password) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/admin/login`,
      data: {
        username,
        password,
      },
      //   headers: {
      //     "x-auth-deviceid": config.header.deviceId,
      //     "x-auth-devicetype": config.header.deviceType,
      //   },
    });
  },

  //-------------------------- logout?

  // add Admin user

  addUser: (username, firstName, lastName, password) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/admin/addUser`,
      data: {
        username,
        firstName,
        lastName,
        password,
      },
    });
  },

  // update admin user
  updateUser: (username, firstName, lastName, password, adminId) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/admin/updateUser/${adminId}`,
      data: {
        username,
        firstName,
        lastName,
        password,
      },
    });
  },

  //delete admin user
  deleteUser: (adminId) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/admin/deleteUser/${adminId}`,
    });
  },

  // get all admin users
  getAllUsers: () => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/admin`,
      headers: {
        "x-auth-deviceid": config.header.deviceId,
        "x-auth-devicetype": config.header.deviceType,
        // "x-auth-token": userProfileObject.getToken(),
      },
    });
  },

  // get admin user by id
  getUserById: (adminId) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/admin/userById/${adminId}`,
    });
  },
};

export default Admin;
