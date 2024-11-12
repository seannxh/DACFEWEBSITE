import { useState, useEffect, createContext } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Signup from "./components/Signup/signup.jsx";
import Signin from "./components/Signin/signin.jsx";
import AdminRoute from "./components/Protects/AdminRoute.jsx";
import NavBar from "./components/NavBar/navbar.jsx";
import ContactUs from "./components/ContactUs/Contactus.jsx";
import MenuForm from "./components/Menuform/Menuform.jsx";
import AboutUs from "./components/Footer/about.jsx";
import Home from "./components/Home/Home.jsx";
import ViewMenu from "./components/ViewMenu/Viewmenu.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PrivacyPolicy from "./components/Footer/privacypolicy.jsx";
import { getUser, isAdmin } from "./services/authService.js";
import "./index.css";

const App = () => {
  const [token, setToken] = useState(getUser());
  const [adminStatus, setAdminStatus] = useState(isAdmin());
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const AuthedUserContext = createContext(null);

  useEffect(() => {
    // Fetch menus and set loading state
    const fetchMenus = async () => {
      setLoading(true);
      try {
        const menuData = await index();
        setMenus(menuData);
      } catch (err) {
        console.log("Error Fetching Menu:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) setAdminStatus(isAdmin());
    fetchMenus();
  }, [token]);

  const handleAddMenu = async (menuFormData) => {
    try {
      const response = await fetch(`${BASE_URL}/menus`, {
        method: "POST",
        body: menuFormData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Error creating menu");

      const newItem = await response.json();
      setMenus([newItem, ...menus]);
      navigate("/viewmenu");
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await deleteMenu(menuId);
      setMenus(menus.filter((menu) => menu._id !== menuId));
      navigate("/viewmenu");
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleUpdateMenu = async (menuId, menuFormData) => {
    try {
      const updatedMenu = await update(menuId, menuFormData);

      if (!updatedMenu) {
        console.error("Update failed: No data returned");
        return;
      }

      const updatedMenus = menus.map((menu) =>
        menu._id === menuId ? updatedMenu : menu
      );

      setMenus(updatedMenus);
      navigate("/viewmenu");
    } catch (err) {
      console.error("Error updating menu:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AuthedUserContext.Provider value={token}>
        <NavBar token={token} setToken={setToken} isAdmin={adminStatus} setAdminStatus={setAdminStatus} />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/viewmenu" element={<ViewMenu isAdmin={adminStatus} />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            
            {/* Admin routes */}
            <Route
              path="/menuform"
              element={
                <AdminRoute isAdmin={adminStatus}>
                  <MenuForm handleAddMenu={handleAddMenu} handleUpdateMenu={handleUpdateMenu} />
                </AdminRoute>
              }
            />

            {/* Auth routes */}
            <Route path="/users/signup" element={<Signup setToken={setToken} />} />
            <Route path="/users/adminlogin" element={<Signin setToken={setToken} />} />
          </Routes>
        </main>
        <Footer />
      </AuthedUserContext.Provider>
    </div>
  );
};

export default App;
