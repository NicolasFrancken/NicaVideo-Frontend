import axios from "axios";

async function updateVideo(videoId, url, title) {
  try {
    const res = await axios.put(
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
