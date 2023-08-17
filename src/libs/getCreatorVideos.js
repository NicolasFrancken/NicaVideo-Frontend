import axios from "axios";

async function getCreatorVideos(creatorId) {
  try {
    const res = await axios.get(
      `https://test-vncs.onrender.com/api/videos/creator/${creatorId}`,
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

export default getCreatorVideos;
