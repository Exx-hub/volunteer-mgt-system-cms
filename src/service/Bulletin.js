import axios from "axios";
import { config } from "../config";
// import { UserProfile } from "../utility";

const BASE_URL = config.BASE_URL;

const Bulletin = {
  // get all bulletin
  getAllBulletin: () => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/bulletin`,
    });
  },
  // add new bulletin
  addBulletin: (title, description, category, regionId) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/bulletin/addBulletin`,
      data: {
        title,
        description,
        isRegional: category === "regional" ? 1 : 0,
        regionId: category === "regional" ? regionId : null,
      },
    });
  },

  // update bulletin
  updateBulletin: (bulletinId, title, description, category, regionId) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/bulletin/updateBulletin/${bulletinId}`,
      data: {
        title,
        description,
        isRegional: category === "regional" ? 1 : 0,
        regionId: category === "regional" ? regionId : null,
      },
    });
  },

  // delete bulletin
  deleteBulletin: (bulletinId) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/bulletin/deleteBulletin/${bulletinId}`,
    });
  },

  // get bulletin by id?
};

export default Bulletin;
