import axiosInstance from "../utils/axiosInstance";

async function getVideos() {
  try {
    const res = await axiosInstance.get(
      "https://test-vncs.onrender.com/api/videos",
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { videos: res.data };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default getVideos;
