// useAxios.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useAxios() {
  const navigate = useNavigate();

  // 1. Ek naya axios instance banate hain
  const instance = axios.create({baseURL: import.meta.env.VITE_BACKEND_BASE_URL,});
console.log("instance",instance.interceptors);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("uid");
        navigate("/");
      }
      // Error ko reject kar do taake catch block mein jaye
      return Promise.reject(error);
    }
  );

  //y function jahan call hoga is Instance ki value whan return kar do
  return instance;
}

export default useAxios;

//     // Navbar.jsx ya jahan component hai
// import useAxios from "../hooks/useAxios"; // path ko apne project ke hisaab se adjust karo

// const axiosInstance = useAxios();

// const getData = async () => {
//   try {
//     const jwtToken = localStorage.getItem("uid");
//     const response = await axiosInstance.get("/login-user/get", {
//       headers: { Authorization: `Bearer ${jwtToken}` },
//     });
//     setCurrentUserData(response.data.data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };


// handlers = [
//   {
//     fulfilled:  (response) => {
//       return response;
//     },
//     rejected: (error) => {
//       if (error.response && error.response.status === 401) {
//         localStorage.removeItem("uid");
//         navigate("/");
//       }
//       // Error ko reject kar do taake catch block mein jaye
//       return Promise.reject(error);
//     },
//     synchronous: false,
//     runWhen: null
//   }
// ]