import axios from "axios";
import { config } from "../config";
// import { UserProfile } from "../utility";

const BASE_URL = config.BASE_URL;

const User = {
  login: (username, password) => {
    return axios({
      method: "post",
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

  // add user
  // update user
  //delete user
  // get all users
  // get user by id

  // logout?

  // get all regions
  // add region
  // add municipality

  // get municipality by region
  //get all news
  // add news
  // get news by id?
  // get all bulletin
  // add new bulletin
  // get bulletin by id?
  // view bulletin?
  // search bulletin?
  // get about text
  // edit about text
};

export default User;
