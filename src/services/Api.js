import axios from "axios";
import { server_API, server_API2, server_API3 } from "../server";
import { server_API1 } from "../server";

export const requestBlood = async (formData) => {
  try {
    const response = await axios.post(`${server_API}/post-blood-data`,formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

export const donateBlood = async (donarData) => {
  try {
    const response = await axios.post(`${server_API2}/post-donar-data`,donarData);
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};


export const sendEmail = async (emailData) => {
  try {
    const response = await axios.post(`${server_API3}/send-email`, emailData);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


// const userLogin = (loginData) => axios.post(`${server_API1}/login`, loginData);
// console.log(userLogin)
// export { userLogin };

export const userRegister = async (registerData) => {
  try {
    const response = await axios.post(`${server_API1}/register`,registerData);
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    const eM =error.response?.data?.message || "an unknown error occured";
    alert(eM)
    console.log(eM)
    throw new Error(eM);
  }
}

const userLogin = async (loginData) => {
  try {
    const response = await axios.post(`${server_API1}/login`,loginData);
    return response;
  } catch (error) {
    console.error("Error submitting form:", error);
    const status = error.response?.status; 
    const message =error.response?.data?.message || "an unknown error occured";
    throw {status,message};
  }
}
export { userLogin };


