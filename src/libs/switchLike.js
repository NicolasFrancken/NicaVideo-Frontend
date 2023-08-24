import axiosInstance from "../utils/axiosInstance";

async function switchLike(videoId, creatorId) {
  try {
    const res = await axiosInstance.put(
      `https://test-vncs.onrender.com/api/videos/like/${creatorId}`,
      { videoId },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { creator: res.data };
  } catch (e) {
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default switchLike;
