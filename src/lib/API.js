import { BASE_URL} from "../config/envConfig.js";
export const registerAPI = async (data) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
};

export const loginAPI = async (data) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
};
export const addProductAPI = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};
export const getProductsAPI = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};