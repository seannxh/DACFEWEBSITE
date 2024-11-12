import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, isAdmin } from "../../services/authService.js";
import ClipLoader from "react-spinners/ClipLoader";

const SignIn = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userResponse = await signin(formData);
      console.log("Response from signin:", userResponse);
      props.setToken(userResponse.token);

      checkAdminStatus();

      setLoading(false);
      navigate("/");
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
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
    navigate("/users/signup");
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="flex justify-center my-4 font-bold text-3xl sm:text-4xl font-cursive">
          Sign In
        </h1>
        <p className="text-red-500 text-center">{errMessage}</p>

        {loading ? (
          <div className="flex justify-center items-center mb-4">
            <ClipLoader color="#700000" loading={loading} size={50} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-col flex justify-center flex-wrap content-center"
          >
            <div className="font-bold text-lg mb-4 font-cursive">
              Username:
              <input
                className="ml-2 p-2 border border-gray-400 rounded w-full"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="font-bold text-lg mb-4 font-cursive">
              Password:
              <input
                className="ml-2 p-2 border border-gray-400 rounded w-full"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                type="submit"
                disabled={isFormInvalid()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive w-1/3"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUpRedirect}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive w-1/3"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive w-1/3"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default SignIn;
