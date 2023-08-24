import axiosInstance from "../utils/axiosInstance";

async function getVideo(videoId) {
  try {
    const res = await axiosInstance.get(
      `https://test-vncs.onrender.com/api/videos/${videoId}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { video: res.data };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default getVideo;
