import axios from "axios";

async function getCreators(creatorId) {
  try {
    const res = await axios.get(
      `https://test-vncs.onrender.com/api/creators/${creatorId}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { creators: res.data.result };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default getCreators;
