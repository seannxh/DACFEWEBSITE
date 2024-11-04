//function call to our backend
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const signup = async (formData) => {
    try{
        const res = await fetch(`${BACKEND_URL}/users/signup`, {
            method: "POST", //type
            headers: {"Content-Type": 'application/json'},//tells them what sort of data were gonna be sendign were gonna be sendign a json data
            body: JSON.stringify(formData)//this ables this postman to send javascript body formdata to db
        })

        const json = await res.json();
        if(json.error){//error handling
            throw new Error(json.error)
        }
        localStorage.setItem('token', json.token)
        return json;
    }catch(err){
        throw new Error(err)//using backend res.status to throw error
    }
}


export const getUser = () => {
    const token = localStorage.getItem('token') //we get the user by the token

    if(!token) return null;//if there is no token then no
    return token // and then we import it
}

//we need to pass formdata for signup and signin because we need the formdata to post and its being passed at signup.jsx and signin.jsx and as signup(formData)
export const signin = async (formData) => {
    try{
        const res = await fetch(`${BACKEND_URL}/users/signin`, {
            method: "POST", //type
            headers: {"Content-Type": 'application/json'},//tells them what sort of data were gonna be sendign were gonna be sendign a json data
            body: JSON.stringify(formData)//this ables this postman to send javascript body formdata to db
        })

        const json = await res.json();
        if(json.error){//error handling
            throw new Error(json.error)
        }
        localStorage.setItem('token', json.token)
        return json;
    }catch(err){
        throw new Error(err)//using backend res.status to throw error
    }
}


export const signout = () => {
    localStorage.removeItem('token');
}
