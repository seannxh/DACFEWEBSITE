import React from 'react';
import FaceBook from '../../assets/facebook.png'
import X from '../../assets/x.png'
import Instagram from '../../assets/instagram.png'
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate();

    const handleMenuClick = () => {
        if(props.token){
        navigate('/viewmenu');
      }else{
        navigate('/users/signup')
      }
    };
    return (
      <div>
        <header>
          <h1>Don's Asian Cuisine</h1>
          <p>Authentic flavors, unforgettable experiences.</p>
        </header>

        <section>
          <h2>Contact Us</h2>
          <p>📌 Address: 2512 Rice Blvd, Houston, TX 77005</p>
          <p>📞 Phone: (713) 533-1188</p>
          <p>📧 Email: customer@donsasiancuisine.com</p>
        </section>

        <section>
          <h2>About Us</h2>
          <p>
            Welcome to Asian Delights, where we bring you the best of traditional Asian cuisine with a modern twist.
            Our chefs craft every dish with fresh ingredients and a passion for flavor. Join us for an authentic
            experience that celebrates the diverse flavors of Asia.
          </p>
        </section>
  
        <section>
          <h2>Our Menu</h2>
          <p>Explore our selection of sushi, dim sum, stir-fries, and more. Check our full menu for details.</p>
          <button onClick={handleMenuClick}>View Menu</button>
        </section>
  
        <section>
          <h2>Follow Us</h2>
          <p>Stay connected on social media:</p>
          <div>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={FaceBook} alt="Facebook" width="24" height="24"/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={Instagram} alt="Instagram" width="24" height="24"/>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src={X} alt="X" width="24" height="24"/>
            </a>
          </div>
        </section>
   
        <footer>
          <p>&copy; 2024 Don's Asian Cuisine. All Rights Reserved.</p>
        </footer>
      </div>
    );
  };

export default Home