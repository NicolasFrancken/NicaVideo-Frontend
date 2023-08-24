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
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default getVideos;
