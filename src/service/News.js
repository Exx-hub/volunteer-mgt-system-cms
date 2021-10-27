import axios from "axios";
import { config } from "../config";
// import { UserProfile } from "../utility";

const BASE_URL = config.BASE_URL;

const News = {
  //get all news
  getAllNews: () => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/news`,
    });
  },
  // add news
  addNews: (headline, description, regionId, municipalityId) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/news/addNews`,
      data: {
        headline,
        description,
        regionId,
        municipalityId,
      },
    });
  },

  // update news?
  updateNews: (newsId, headline, description, regionId, municipalityId) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/news/updateNews/${newsId}`,
      data: {
        headline,
        description,
        regionId,
        municipalityId,
      },
    });
  },
  // delete news?
  deleteNews: (newsId) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/news/deleteNews/${newsId}`,
    });
  },

  // get news by id?
};

export default News;
