import axios from "axios";

async function switchFollow(followCreatorId, creatorId) {
  try {
    const res = await axios.put(
      `https://test-vncs.onrender.com/api/creators/follow/${creatorId}`,
      {
        followCreatorId,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return { creator: res.data.result };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default switchFollow;
