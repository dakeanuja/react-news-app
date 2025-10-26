import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config/apiConfig";

export const fetchNews = async (query = "technology",page=1,pageSize=9) => {
  const response = await axios.get(`${API_BASE_URL}/everything`, {
    params: {
      q: query,
      apiKey: API_KEY, 
      page : page,
      pageSize : pageSize
      
    },
  });
  return {
    articles: response.data.articles,
    totalResults:response.data.totalResults
  };
};
