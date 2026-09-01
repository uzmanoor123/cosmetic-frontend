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
export const createCheckoutSessionAPI = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/api/payment/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log("Checkout API error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
export const getMyOrdersAPI = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/orders/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Orders response status:", response.status);

    const data = await response.json();

    console.log("Orders API response:", data);

    return data;
  } catch (error) {
    console.log("Orders error:", error);

    return {
      success: false,
      message: "Unable to fetch orders",
    };
  }
};
export const updateOrderStatusAPI = async (orderId, orderStatus) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/api/orders/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderStatus,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Update order status error:", error);

    return {
      success: false,
      message: "Unable to update order status",
    };
  }
};
export const createReviewAPI = async (productId, orderId,rating,comment) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          orderId,
          rating,
          comment,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Create review error:", error);

    return {
      success: false,
      message: "Unable to add review",
    };
  }
};
export const getProductReviewsAPI = async (productId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/reviews/product/${productId}`
    );

    return await response.json();
  } catch (error) {
    console.log("Get reviews error:", error);

    return {
      success: false,
      message: "Unable to get reviews",
    };
  }
};
export const getAIRecommendationsAPI = async (skinProblem) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/ai/recommend`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          skinProblem,
        }),
      }
    );

    const data = await response.json();

    console.log("AI Recommendation Response:", data);

    return data;
  } catch (error) {
    console.error(
      "AI Recommendation API Error:",
      error
    );

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};
export const chatWithAIAPI = async (message) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/ai/chat`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message,
        }),
      }
    );

    const data = await response.json();

    console.log("AI Chat Response:", data);

    return data;
  } catch (error) {
    console.error("AI Chat API Error:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};