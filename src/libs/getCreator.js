import axiosInstance from "../utils/axiosInstance";

async function getCreator(creatorId) {
  try {
    const res = await axiosInstance.get(
      `https://test-vncs.onrender.com/api/creators/creator/${creatorId}`,
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

export default getCreator;
