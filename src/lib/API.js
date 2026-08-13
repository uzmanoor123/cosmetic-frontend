import { BASE_URL } from "../config/envConfig.js";

export const registerAPI = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const loginAPI = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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


export const getProductByIdAPI = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};


export const updateProductAPI = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};


export const deleteProductAPI = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};


export const addToCartAPI = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
    }),
  });

  return await response.json();
};

export const getCartAPI = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};


export const increaseCartAPI = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/cart/increase`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
    }),
  });

  return await response.json();
};

export const decreaseCartAPI = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/cart/decrease`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
    }),
  });

  return await response.json();
};

export const removeCartItemAPI = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/api/cart/remove/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};