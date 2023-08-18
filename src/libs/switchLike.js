import axios from "axios";

async function switchLike(videoId, creatorId) {
  try {
    const res = await axios.put(
      `https://test-vncs.onrender.com/api/videos/like/${creatorId}`,
      { videoId },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { creator: res.data };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default switchLike;