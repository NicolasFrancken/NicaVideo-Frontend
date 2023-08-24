import axiosInstance from "../utils/axiosInstance";

async function updateVideo(videoId, url, title) {
  try {
    const res = await axiosInstance.put(
      `https://test-vncs.onrender.com/api/videos/creator/${videoId}`,
      { url, title },
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

export default updateVideo;
