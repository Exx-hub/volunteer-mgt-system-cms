import axios from "axios";
import { config } from "../config";
// import { UserProfile } from "../utility";

const BASE_URL = config.BASE_URL;

const AppUser = {
  // get all APP users
  getAllAppUsers: () => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/user`,
      headers: {
        "x-auth-deviceid": config.header.deviceId,
        "x-auth-devicetype": config.header.deviceType,
        // "x-auth-token": userProfileObject.getToken(),
      },
    });
  },

  // get APP user by id
  getUserById: (userId) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/user/userById/${userId}`,
    });
  },

  // add APP user
  addAppUser: (
    firstName,
    lastName,
    // email,
    mobileNo,
    address,
    birthDate,
    regionId,
    municipalityId,
    gender,
    password
  ) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/user/createUser`,
      data: {
        mobileNo: mobileNo,
        firstName: firstName,
        lastName: lastName,
        address: address,
        gender: gender,
        birthDate: birthDate,
        // email: email,
        regionId: regionId,
        municipalityId: municipalityId,
        password: password,
      },
    });
  },

  // update APP user
  updateAppUser: (
    userId,
    firstName,
    lastName,
    // email,
    mobileNo,
    address,
    birthDate,
    regionId,
    municipalityId,
    gender,
    password
  ) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/user/updateUser/${userId}`,
      data: {
        mobileNo: mobileNo,
        firstName: firstName,
        lastName: lastName,
        address: address,
        gender: gender,
        birthDate: birthDate,
        // email: email,
        regionId: regionId,
        municipalityId: municipalityId,
        password: password,
      },
    });
  },

  // delete APP user
  deleteAppUser: (userId) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/user/deleteUser/${userId}`,
    });
  },

  // search user by last name
  getUserByName: (searchValue) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/user/search?search=${searchValue}`,
    });
  },
};

export default AppUser;
