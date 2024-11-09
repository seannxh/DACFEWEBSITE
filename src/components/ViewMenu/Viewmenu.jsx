import React, { useEffect, useState } from 'react';
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;

const ViewMenu = ({ handleDeleteMenu, isAdmin }) => {
    const [menus, setMenus] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedDishType, setSelectedDishType] = useState("");
    const [filterMenu, setFilteredMenu] = useState([]);
    const [editingMenuId, setEditingMenuId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

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

        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleEditClick = (menu) => {
        setEditingMenuId(menu._id);
        setEditFormData({ ...menu });
        setImagePreview(`${BASE_URL}${menu.foodImg}`);
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

    const renderMenuByDishType = (dishType) => {
        const items = filterMenu.filter((menu) => menu.dishType === dishType);
        if (items.length === 0) return null;

        return (
            <div key={dishType}>
                <h3 className="flex justify-center my-4 font-bold text-3xl sm:text-2xl text-red-600">{dishType}</h3>
                {items.map((menu) => (
                    <div key={menu._id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }} className="flex-col flex justify-center flex-wrap content-center">
                        {editingMenuId === menu._id ? (
                            <form onSubmit={handleEditSubmit} className="flex-col flex justify-center flex-wrap content-center">
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleFormChange}
                                    placeholder="Name"
                                /><br />
                                <textarea
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleFormChange}
                                    placeholder="Description"
                                ></textarea><br />
                                <input
                                    type="number"
                                    name="price"
                                    value={editFormData.price}
                                    onChange={handleFormChange}
                                    placeholder="Price"
                                /><br />
                                <input
                                    type="file"
                                    name="foodImg"
                                    onChange={handleFileChange}
                                /><br />
                                {imagePreview && (
                                    <img src={imagePreview} alt="" style={{ width: '200px' }} />
                                )}
                                <div className="self-center mb-2">
                                    <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-2">Save</button>
                                    <button type="button" onClick={() => setEditingMenuId(null)} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-2">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h4 className="flex justify-center my-4 font-bold text-xl sm:text-xl ">{menu.name}</h4>
                                <p className="flex flex-wrap justify-center my-4 text-m max-w-xl ">{menu.description}</p>
                                <p className="flex flex-wrap justify-center my-4 text-m max-w-xl ">Price: ${menu.price}</p>
                                <img src={`${BASE_URL}${menu.foodImg}`} alt="" style={{ width: '200px' }} /><br />
                                {isAdmin && (
                                    <div className="self-center mb-2">
                                        <button onClick={() => handleEditClick(menu)} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-2">Edit</button>
                                        <button onClick={() => handleDeleteMenu(menu._id)} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive mr-2">Delete</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const dishTypes = [
        "APPETIZER", "BANH MI", "SOUPS & SALADS", "MAIN", "ENTREES",
        "PHO NOODLE SOUPS", "VIETNAMESE RICE PLATTERS", "NOODLES",
        "V-BOWLS VERMICELLI", "FRIED RICE", "SIDE", "DRINK", "RED WINE",
        "WHITE WINE", "SPARKLING WINE", "DOMESTIC BEER", "HOUSE WINE",
        "IMPORTED BEER", "SAKE", "DESSERT", "COCKTAIL", "CATERING"
    ];

    return (
        <div className="flex flex-col items-center my-6">
            <label
                htmlFor="menus-select"
                className="font-bold text-3xl sm:text-2xl text-red-600 mb-4"
            >
                View Menu
            </label>
            <div className="flex justify-center mb-8">
                <select
                    value={selectedDishType}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded text-center"
                >
                    <option value="">View All</option>
                    {dishTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <h2 className="font-bold text-5xl sm:text-2xl mb-6">Our Menu</h2>
            {dishTypes.map((type) => renderMenuByDishType(type))}
        </div>
    );
};

export default ViewMenu;
