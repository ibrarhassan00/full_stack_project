import axios from "axios";
import toast from "react-hot-toast"

const httpAction = async (data) => {
  try {
    const response = await axios({
      url: data.url,
      method: data.method || "GET",
      data: data.body || null,
      withCredentials: true, // same as fetch's credentials: "include"
    });
    
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message)
    console.error("Axios Error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Request failed");
  }
};

export default httpAction;