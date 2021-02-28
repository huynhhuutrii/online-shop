import axios from "axios";
const api = "http://localhost:4000/api"
const token = window.localStorage.getItem("token");
const instance = axios.create({
  baseURL: api,
  headers: {
    "Authorization": token? `Bearer ${token}`: "",
  }
})
export default instance;