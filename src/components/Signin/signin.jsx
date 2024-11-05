import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, isAdmin } from '../../services/authService.js';

const SignIn = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errMessage, setErrMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userResponse = await signin(formData);
            console.log("Response from signin:", userResponse);
            props.setToken(userResponse.token);

            checkAdminStatus();

            navigate('/');
        } catch (err) {
            setErrMessage(err.message);
        }
    };

    const checkAdminStatus = async () => {
        const adminStatus = await isAdmin();
        console.log("User admin status:", adminStatus);
    };

    const isFormInvalid = () => {
        return !formData.username || !formData.password;
    };

    const handleSignUpRedirect = () => {
        navigate('/users/signup');
    };

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
                    <button type="submit" disabled={isFormInvalid()}>
                        Sign In
                    </button>
                    <button onClick={handleSignUpRedirect}>Sign Up</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
    );
};

export default SignIn;