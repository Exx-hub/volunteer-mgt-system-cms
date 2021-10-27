import axios from "axios";
import { config } from "../config";
// import { UserProfile } from "../utility";

const BASE_URL = config.BASE_URL;

const About = {
  // get about text
  getAboutInfo: () => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/about`,
    });
  },
  // add about
  // update about text
  updateAboutInfo: (aboutId, details) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/about/updateAbout/${aboutId}`,
      data: {
        details,
      },
    });
  },
  // delete about
};

export default About;
