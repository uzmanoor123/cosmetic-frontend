import { BASE_URL} from "../config/envConfig.js";
export const registerAPI = async (data) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
};

export const loginAPI = async (data) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
};