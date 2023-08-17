import axios from "axios";

async function getVideos() {
  try {
    const res = await axios.get("https://test-vncs.onrender.com/api/videos", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return { videos: res.data };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default getVideos;
