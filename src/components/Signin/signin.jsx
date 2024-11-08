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
            <h1 className="flex justify-center my-4 font-bold text-3xl sm:text-4xl">Sign In</h1>
            <p>{errMessage}</p>
            <form onSubmit={handleSubmit} className="flex-col flex justify-center flex-wrap content-center">
                <div className='font-bold text-lg'>
                    Username:
                    <input
                        className='ml-2'
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className='font-bold text-lg'>
                    Password:
                    <input
                        className='ml-2'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className='self-center mb-2'>
                    <button type="submit" disabled={isFormInvalid()} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-1">
                        Sign In
                    </button>
                    <button onClick={handleSignUpRedirect} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-1">Sign Up</button>
                    <button onClick={() => navigate('/') } className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive">Cancel</button>
                </div>
            </form>
        </main>
    );
};

export default SignIn;