import axiosInstance from "../utils/axiosInstance";

async function switchFollow(followCreatorId, creatorId) {
  try {
    const res = await axiosInstance.put(
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
    if (e.response.status === 401) {
      return { status: 401 };
    }
    return { message: e.response.data.message };
  }
}

export default switchFollow;
