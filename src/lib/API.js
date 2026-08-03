
export const registerAPI = async (data) => {
    const response = await fetch("http://localhost:5000/auth/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
};

export const loginAPI = async (data) => {
    const response = await fetch("http://localhost:5000/auth/login", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
};