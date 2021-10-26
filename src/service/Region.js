import axios from "axios";
import { config } from "../config";
// import { UserProfile } from "../utility";

const BASE_URL = config.BASE_URL;

const Region = {
  // get all regions
  getRegionList: () => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/region`,
    });
  },

  // get region by id
  getRegionById: (regionId) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/region/regionById/${regionId}`,
    });
  },

  // add region
  // update region
  // delete region

  // add municipality
  // update municipality
  // delete municipality
  // get all municipalities
  // get municipality by region
};

export default Region;
