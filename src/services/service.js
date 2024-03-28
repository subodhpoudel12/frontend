import axios from 'axios';

const verifyCode = async (code) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/verify`, { code });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : 'An error occurred. Please try again.';
  }
};

export { verifyCode };
