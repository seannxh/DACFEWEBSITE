import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { index, Show, Create, CreateSuggestions , deleteMenu, update } from "../../services/menuService.js"


const MenuForm = ({ handleAddMenu }) => {
  const { menuId } = useParams();
  const [imagePreview, setImagePreview] = useState(null)
  const [ingredientInput, setIngredientInput] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: [],
    foodImg: "",
    description: "",
    dishType:""
  });

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

  const handleFileChange = (e) => {
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
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("ingredients", formData.ingredients);
    data.append("description", formData.description);
    data.append("dishType", formData.dishType);
    if (formData.foodImg) data.append("foodImg", formData.foodImg); // Only append if there's an image
  
    if (menuId) {
      handleUpdateMenu(menuId, data);
      console.log(menuId, data)
    } else {
      handleAddMenu(data);
    }

    console.log('form', formData)
  };

  const handleIngredientAdd = () => {
    if (ingredientInput.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, ingredientInput.trim()]
      }));
      setIngredientInput('');
    }
  };

  const handleIngredientRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.filter((_, i) => i !== index)
    }));
  };
  

    return(
        <main>
          <h1>New Menu</h1>
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="ingredients-input">Add Ingredient</label>
                <input
                  type="text"
                  id="ingredients-input"
                  value={ingredientInput} // Bind the temporary input state
                  onChange={(e) => setIngredientInput(e.target.value)}
                />
                <button type="button" onClick={handleIngredientAdd}>
                  Add Ingredient
                </button>
                <ul>
                  {formData.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient} <button type="button" onClick={() => handleIngredientRemove(index)}>Remove</button>
                    </li>
                ))}
                </ul>
                <label htmlFor="description-input">Descriptions</label>
                <input 
                    required
                    type="text"
                    name="description"
                    id="description-input"
                    value={formData.description} 
                    onChange={handleChange}                    
                />
                <label htmlFor="dishType-select">Dish Type</label>
                  <select
                    required
                    name="dishType"
                    id="dishType-select"
                    value={formData.dishType}
                    onChange={handleChange}
                  >
                    <option value="">Select Dish Type</option>
                    <option value="Main">Main</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Side">Side</option>
                    <option value="Drink">Drink</option>
                  </select>

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
