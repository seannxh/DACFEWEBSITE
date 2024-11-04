import { useState } from 'react' //we need to use the state because we wioll keep the form data tracked via state
import { Link, useNavigate } from 'react-router-dom';//link because there will be a cancel button
import { signup } from "../../services/authService.js"

//NOTES
//whenveer we have () in onClick we have to put () => arrow 


const SignUp = (props) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
    });//easiest way to represent data 
    const [errMessage, setErrMessage] = useState('') //to record any errors and display to the screen
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();//default beahvior of html is refresh so this will prevent full refresh of the site but rather the only needed part
        const userData = await signup(formData)
        console.log(userData)
        // set the user
        props.setToken(userData.token)
        // call our backend to create the user and save the token
        //navigate the user to the logged page
        navigate('/')
        console.log(formData)
    }
    //this function checks to see if any of the fields are empty
    //and if the password field matches the confirmation password
    // disabled={} true true true false
    const isFormInvalid = () => {
        if(!formData.username || !formData.password || !formData.passwordConfirm){ // checks if all of them are field out
            return true
        }else if(formData.password !== formData.passwordConfirm){ //check if they are both 
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
                {/* {form jsx } */}
                <h1>Sign Up</h1>
                <p>{errMessage}</p> 
                {/* {any error message will show} */}
                
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
                    {/*when i see the form data submit and console log it out in console it means its succesfgully connected */}
                        <button type="submit" disabled={isFormInvalid}>SignUp</button>
                        <button onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
               
            </main>
        </>
    )
}

export default SignUp