import React, { useEffect, useState } from 'react';
import logo from '../../assets/brandlogo.jpg';
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;

const ViewMenu = ({ handleDeleteMenu, isAdmin }) => {
    const [menus, setMenus] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedDishType, setSelectedDishType] = useState("");
    const [filterMenu, setFilteredMenu] = useState([]);
    const [editingMenuId, setEditingMenuId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [fullScreenImage, setFullScreenImage] = useState(null); // New state for full-screen image

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch(`${BASE_URL}/menus`);
                if (!response.ok) throw new Error("Error fetching menus");

                const menuData = await response.json();
                setMenus(menuData);
                setFilteredMenu(menuData);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetchMenus();
    }, []);

    const handleEditClick = (menu) => {
        setEditingMenuId(menu._id);
        setEditFormData({ ...menu });
        setImagePreview(`${BASE_URL}${menu.foodImg}`);
        setSelectedDishType(menu.dishType);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const getFile = e.target.files[0];
        if (getFile) {
            setEditFormData((prevData) => ({
                ...prevData,
                foodImg: getFile,
            }));
            const imageUrl = URL.createObjectURL(getFile);
            setImagePreview(imageUrl);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setSelectedDishType(value);
        if (value === "") {
            setFilteredMenu(menus);
        } else {
            const filteredItems = menus.filter((menu) => menu.dishType === value);
            setFilteredMenu(filteredItems);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", editFormData.name);
        data.append("description", editFormData.description);
        data.append("price", editFormData.price);
        data.append("dishType", editFormData.dishType);

        if (editFormData.foodImg) {
            data.append("foodImg", editFormData.foodImg);
        }

        try {
            const response = await fetch(`${BASE_URL}/menus/${editingMenuId}`, {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) throw new Error('Error updating menu');
            
            const updatedMenu = await response.json();
            setMenus((prevMenus) =>
                prevMenus.map((menu) => (menu._id === updatedMenu._id ? updatedMenu : menu))
            );
            setFilteredMenu((prevMenus) =>
                prevMenus.map((menu) => (menu._id === updatedMenu._id ? updatedMenu : menu))
            );
            setEditingMenuId(null);
        } catch (error) {
            console.error('Error submitting menu:', error);
        }
    };

    const handleImageClick = (imageUrl) => {
        setFullScreenImage(imageUrl); // Set the image URL for full-screen view
    };

    const closeModal = () => {
        setFullScreenImage(null); // Close the modal by setting image to null
    };

    const renderMenuByDishType = (dishType) => {
        const items = filterMenu.filter((menu) => menu.dishType === dishType);
        if (items.length === 0) return null;

        return (
            <div key={dishType}>
                <h3 className="flex justify-center my-1 font-bold text-3xl sm:text-2xl text-red-700">{dishType}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((menu) => (
                        <div
                            key={menu._id}
                            className="flex flex-col lg:flex-row items-center justify-between p-4 border rounded-lg w-full max-w-md"
                        >
                            {editingMenuId === menu._id ? (
                                <form onSubmit={handleEditSubmit} className="flex flex-col lg:flex-row items-center w-full">
                                    <div className="lg:w-3/4 flex flex-col items-start p-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleFormChange}
                                            placeholder="Name"
                                            className="mb-2 w-full"
                                        />
                                        <textarea
                                            name="description"
                                            value={editFormData.description}
                                            onChange={handleFormChange}
                                            placeholder="Description"
                                            className="mb-2 w-full"
                                        ></textarea>
                                        <input
                                            type="number"
                                            name="price"
                                            value={editFormData.price}
                                            onChange={handleFormChange}
                                            placeholder="Price"
                                            className="mb-2 w-full"
                                        />
                                        <input
                                            type="file"
                                            name="foodImg"
                                            onChange={handleFileChange}
                                            className="mb-2 w-full"
                                        />
                                        {imagePreview && (
                                            <img src={imagePreview} alt="" className="w-32 h-32 object-cover mt-2" />
                                        )}
                                        <div className="self-start mt-2">
                                            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-2">Save</button>
                                            <button type="button" onClick={() => setEditingMenuId(null)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-2">Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="flex flex-col items-start lg:w-3/4 p-4">
                                        <h4 className="font-bold text-lg sm:text-xl mb-2">{menu.name}</h4>
                                        <p className="text-sm max-w-xs mb-2">{menu.description}</p>
                                        <p className="text-sm max-w-xs mb-2">Price: ${menu.price}</p>
                                    </div>
                                    <div className="lg:w-1/4 flex justify-center">
                                        <img
                                            src={`${BASE_URL}${menu.foodImg}`}
                                            alt=""
                                            className="w-48 h-auto object-cover rounded-lg cursor-pointer" // Make cursor pointer to indicate clickability
                                            onClick={() => handleImageClick(`${BASE_URL}${menu.foodImg}`)} // Open full-screen image on click
                                        />
                                    </div>
                                    {isAdmin && (
                                        <div className="self-start mt-2">
                                            <button onClick={() => handleEditClick(menu)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-2">Edit</button>
                                            <button onClick={() => handleDeleteMenu(menu._id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-2">Delete</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const dishTypes = [
        "APPETIZER", "BANH MI", "SOUPS & SALADS", "ENTREES",
        "PHO NOODLE SOUPS", "VIETNAMESE RICE PLATTERS", "NOODLES",
        "V-BOWLS VERMICELLI", "FRIED RICE", "DRINK", "RED WINE",
        "WHITE WINE", "SPARKLING WINE", "DOMESTIC BEER", "HOUSE WINE",
        "IMPORTED BEER", "SAKE", "DESSERT", "COCKTAIL", "CATERING"
    ];

    return (
        <div className="flex flex-col items-center my-6">
            <img src={logo} alt="Don's Asian Cuisine Logo" className="h-15 w-auto " />
            <br/>
            <label
                htmlFor="menus-select"
                className="font-bold text-3xl sm:text-2xl mb-4"
            >
                <span className="text-black">Filter</span> <span className="text-red-700">Menu</span>
            </label>
            <div className="flex justify-center mb-8">
                <select
                    value={selectedDishType}
                    onChange={handleChange}
                    className="border border-black p-2 rounded text-center"
                >
                    <option value="">View All</option>
                    {dishTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            {dishTypes.map((type) => renderMenuByDishType(type))}

            {/* Full-Screen Image Modal */}
            {fullScreenImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <span className="absolute top-5 right-5 text-white text-3xl cursor-pointer" onClick={closeModal}>&times;</span>
                    <img src={fullScreenImage} alt="Full Screen" className="max-w-full max-h-full" />
                </div>
            )}
        </div>
    );
};

export default ViewMenu;
