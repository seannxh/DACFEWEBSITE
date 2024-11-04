import { useState } from 'react' //we need to use the state because we will keep the form data tracked via state
import { useNavigate } from 'react-router-dom';
import { signin } from '../../services/authService.js'

const SignIn = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errMessage, setErrMessage] = useState(''); //to record any errors and display that to the screen


    const handleChange = (e) => {
        setFormData({
            ...formData, //the existing formdata's data
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // call our backend to create the user
            const userResponse = await signin(formData);
            console.log(userResponse)

            // set the users' token
            props.setToken(userResponse.token);

            // navigate the user to the logged page
            navigate('/')

            console.log(formData)
        } catch (err) {
            setErrMessage(err.message)
        }
    }


    const isFormInvalid = () => {
        if (!formData.username || !formData.password ) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <main>
            <h1>Sign In</h1>
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
                    <button type='submit' disabled={isFormInvalid}>Sign In</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
    )
}



export default SignIn;