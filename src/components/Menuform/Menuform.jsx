import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Show } from "../../services/menuService.js"


const MenuForm = ({ handleAddMenu, handleUpdateMenu }) => {
  const { menuId } = useParams();
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: "",
    foodImg: "",
    description: ""
  });

  const handleFileChange = (e) => {

  useEffect(() => {
    if (menuId) {
      const fetchTrack = async () => {
        try {
          const menuData = await Show(menuId);
          setFormData(menuData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchTrack();
    }
  }, [menuId]);

  const getFile = e.target.files[0];

    if(getFile){
      setFormData({
        ...formData,
        foodImg: getFile,
      })
      const imageUrl = URL.createObjectURL(getFile);
      setImagePreview(imageUrl)
    }
  };

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (menuId) {
      handleUpdateMenu(menuId, formData);
    } else {
      handleAddMenu(formData);
    }
  };

    return(
        <main>
            <form onSubmit={handleSubmit}>
            <h1>{menuId ? 'Edit Menu' : 'New Menu'}</h1>
                <label htmlFor="name-input">Name</label>
                <input 
                    required
                    type="text"
                    name="name"
                    id="name-input"
                    value={formData.name}
                    onChange={handleChange}                    
                />
                <label htmlFor="price-input">Price</label>
                <input 
                    required
                    type="number"
                    name="price"
                    id="price-input"
                    value={formData.price} 
                    onChange={handleChange}                    
                />
                <label htmlFor="ingredients-input">Ingredients</label>
                <input 
                    required
                    type="text"
                    name="ingredients"
                    id="ingredients-input"
                    value={formData.ingredients} 
                    onChange={handleChange}                    
                />
                <label htmlFor="foodImg-input">Food Image</label>
                <input
                    required
                    type="file"
                    name="foodImg"
                    id="foodImg-input"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {imagePreview && (
                  <div>
                    <img src={imagePreview} alt="Food Preview" style={{ width: '200px', height: 'auto' }} />
                  </div>
                )}
                <button type="submit">Submit</button>
            </form>
        </main>
    )
};

export default MenuForm;
