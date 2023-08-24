import axiosInstance from "../utils/axiosInstance";

async function deleteVideo(videoId) {
  try {
    const res = await axiosInstance.delete(
      `https://test-vncs.onrender.com/api/videos/creator/${videoId}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { deletedVideo: res.data };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default deleteVideo;
