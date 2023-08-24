import axiosInstance from "../utils/axiosInstance";

async function uploadVideo(creatorId, url, title) {
  try {
    const res = await axiosInstance.post(
      `https://test-vncs.onrender.com/api/videos/creator/${creatorId}`,
      {
        url,
        title,
      },
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

export default uploadVideo;
