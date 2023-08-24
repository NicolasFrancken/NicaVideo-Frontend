import axiosInstance from "../utils/axiosInstance";

async function publishSwitch(videoId) {
  try {
    const res = await axiosInstance.put(
      `https://test-vncs.onrender.com/api/videos/creator/publish/${videoId}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { updatedVideo: res.data.video };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default publishSwitch;
