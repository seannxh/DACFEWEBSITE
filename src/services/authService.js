//function call to our backend
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const signup = async (formData) => {
    try{
        const res = await fetch(`${BACKEND_URL}/signup`, {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(formData)
        })

        const json = await res.json();
        if(json.error){
            throw new Error(json.error)
        }
        localStorage.setItem('token', json.token)
        return json;
    }catch(err){
        throw new Error(err)
    }
}


export const getUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        
        const user = jwtDecode(token);
        return user;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const isAdmin = () => {
    const user = getUser();
    return user?.admin === true; 
};

export const signin = async (formData) => {
    try{
        const res = await fetch(`${BACKEND_URL}/signin`, {
            method: "POST", 
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(formData)
        })

        const json = await res.json();
        if(json.error){
            throw new Error(json.error)
        }
        localStorage.setItem('token', json.token)
        return json;
    }catch(err){
        throw new Error(err)
    }
}


export const signout = () => {
    localStorage.removeItem('token');
}
