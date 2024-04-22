import axios from "axios";
import { toast } from "react-toastify";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const fetchFile = async (id: string) => {
  const options = {
    method: "GET",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    params: { id },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
    },
  };

  try {
    const res = await axios.request(options);
    return res;
  } catch (error) {
    console.log(error);
      toast.error("Failed! Please try again later", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
        theme: "colored",
      });
  }
};
