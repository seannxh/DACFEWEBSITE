import React, { useEffect, useState } from 'react';
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;

const ViewMenu = ({ handleDeleteMenu, handleUpdateMenu, isAdmin }) => {
    const [menus, setMenus] = useState([]);
    const [imagePreview, setImagePreview] = useState(null)
    const [file, setFile] = useState(null);
    const [editingMenuId, setEditingMenuId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch(`${BASE_URL}/menus`);
                if (!response.ok) throw new Error("Error fetching menus");

                const menuData = await response.json();
                setMenus(menuData);
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
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await handleUpdateMenu(editingMenuId, editFormData);
        setEditingMenuId(null); // Close the edit form after submission
    };

    const handleFileChange = (e) => {
        const selectedPic = e.target.files[0];
        if (selectedPic) {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview); // Revoke old preview URL
            }
            setFile(selectedPic);
            const previewURL = URL.createObjectURL(selectedPic);
            setImagePreview(previewURL); // Set new preview
            console.log("Image selected:", selectedPic);
            console.log("Preview URL:", previewURL);
        } else {
            console.error("No image selected");
        }
    };
    
    

    return (
        <div>
            <h1>Edit Menu</h1>
            <ul>
                {menus.map((menu) => (
                    <li key={menu._id}>
                        {editingMenuId === menu._id ? (
                            // Edit form
                            <form onSubmit={handleEditSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleFormChange}
                                    placeholder="Name"
                                /><br/>
                                <input
                                    type="text"
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleFormChange}
                                    placeholder="Description"
                                /><br/>
                                <input
                                    type="number"
                                    name="price"
                                    value={editFormData.price}
                                    onChange={handleFormChange}
                                    placeholder="Price"
                                /><br/>
                                <label htmlFor="foodImg-input">Food Image</label>
                                <input
                                    type="file"
                                    name="foodImg"
                                    id="foodImg-input"
                                    onChange={handleFileChange}
                                /><br/>
                                {imagePreview && (
                                    <div>
                                        <img src={imagePreview} alt="Food Preview" style={{ width: '200px', height: 'auto' }} />
                                    </div>
                                )}
                                <button type="submit">Save</button><br/>
                                <button type="button" onClick={() => setEditingMenuId(null)}>
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            // Display menu details
                            <>
                                <h2>{menu.name}</h2>
                                <p>Description: {menu.description}</p>
                                <p>Price: ${menu.price}</p>
                                <img src={`${BASE_URL}${menu.foodImg}`} alt={menu.name} style={{ width: '100px', height: '100px' }} />
                                <br/><br/>
                                Ingredients:
                                <ul>
                                    {Array.isArray(menu.ingredients) ? (
                                        menu.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))
                                    ) : (
                                        <p>No ingredients available</p>
                                    )}
                                </ul>
                                <div>
                                    {isAdmin && (
                                        <>
                                            <button onClick={() => handleEditClick(menu)}>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteMenu(menu._id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewMenu;
