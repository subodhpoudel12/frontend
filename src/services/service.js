import axios from 'axios';

const verifyCode = async (code) => {
  try {
    const response = await axios.post(`http://localhost:5000/verify`, { code });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : 'An error occurred. Please try again.';
  }
};

export { verifyCode };
