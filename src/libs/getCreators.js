import axiosInstance from "../utils/axiosInstance";

async function getCreators(creatorId) {
  try {
    const res = await axiosInstance.get(
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
