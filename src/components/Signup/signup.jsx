import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signup } from "../../services/authService.js"

const SignUp = (props) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
    }); 
    const [errMessage, setErrMessage] = useState('')
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await signup(formData)
        console.log(userData)
        props.setToken(userData.token)
        navigate('/')
        console.log(formData)
    }
    const isFormInvalid = () => {
        if(!formData.username || !formData.password || !formData.passwordConfirm){
            return true
        }else if(formData.password !== formData.passwordConfirm){
            return true;
        }else if(formData.username.length < 3 || formData.password.length <3 ){
            return true;
        }else {
            return false;
        }
    }

    return (
        <>
            <main>
                <h1>Sign Up</h1>
                <p>{errMessage}</p> 
                
                <form onSubmit={handleSubmit}>
                    <div>
                        Username: 
                        <input 
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        Password: 
                        <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                         />
                    </div>
                    <div>
                        Password Confirmation: 
                            <input 
                                type="password"
                                name="passwordConfirm"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                            />
                    </div>
                    <div>
                        <button type="submit" disabled={isFormInvalid}className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive">SignUp</button>
                        <button onClick={() => navigate('/')}className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive">Cancel</button>
                    </div>
                </form>
               
            </main>
        </>
    )
}

export default SignUp