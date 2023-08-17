import axios from "axios";

async function signup(name, email, password, image) {
  try {
    const res = await axios.post(
      "https://test-vncs.onrender.com/api/creators/signup",
      {
        name,
        email,
        password,
        image,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return { user: res.data };
  } catch (e) {
    return { message: e.response.data.message };
  }
}

export default signup;
