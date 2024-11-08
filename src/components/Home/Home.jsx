import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const background =
    "https://png.pngtree.com/thumb_back/fw800/background/20240405/pngtree-asian-food-background-with-various-ingredients-on-rustic-stone-image_15700116.jpg";

  const slides = [
    { url: "https://lh3.googleusercontent.com/p/AF1QipNVn_VP2Wkr-jCleqeH4Mdxaebxy9LnlG33A8m3=s680-w680-h510" },
    { url: "https://lh3.googleusercontent.com/p/AF1QipPlKIhXlpuQBDlmp1G-8k7GJUnh0OLf0FxD8Qgf=s680-w680-h510" },
    { url: "https://lh3.googleusercontent.com/p/AF1QipN08RCU4zjSZb-H1ZZBprRf-30GBNvMCAsDSzGy=s680-w680-h510" },
    { url: "https://lh3.googleusercontent.com/p/AF1QipPf3npwcWR-0oaKgnAXHbAxSZK_9C0yHU84PNyq=s680-w680-h510" },
  ];

  const handleMenuClick = () => {
    if (props.token) {
      navigate("/viewmenu");
    } else {
      navigate("/users/signup");
    }
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };


  const handleDirectionsClick = () => {
    window.open("https://www.google.com/maps/dir/?api=1&destination=Don's+Asian+Cuisine,2512+Rice+Boulevard,Houston,TX+77005", "_blank");
  };

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-4xl md:text-6xl font-nova mb-4 inline font-bold">
              DON'S{" "}
            </h1>
            <h1 className="text-red-500 text-4xl md:text-6xl font-nova mb-4 inline font-bold">
              ASIAN CUISINE
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-6 font-cursive">
              Authentic flavors, unforgettable experiences.
            </p>
            <button
              onClick={handleMenuClick}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive"
            >
              VIEW MENU
            </button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white">
        <div className="sm:flex items-center max-w-screen-xl mx-auto">
          {/* Image Section */}
          <div className="sm:w-1/2 p-10">
            <div className="image object-center text-center ">
              <img
                src="/Dons.jpg"
                alt="About Us"
                className="rounded-3xl"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="sm:w-1/2 p-5">
            <div className="text">
              <span className="text-gray-500 border-b-2 border-red-500 uppercase">
                About us
              </span>
              <h2 className="my-4 font-bold text-3xl sm:text-4xl">
                About <span className="text-red-500">Our Team</span>
              </h2>
              <p className="text-black font-league font-bold">
                Welcome to Asian Delights, where we bring you the best of
                traditional Asian cuisine with a modern twist. Our chefs craft
                every dish with fresh ingredients and a passion for flavor. Join
                us for an authentic experience that celebrates the diverse
                flavors of Asia.
              </p>
              <br/>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive" onClick={handleDirectionsClick}>Directions</button>
            </div>
          </div>
        </div>

        {/* Popular Dishes Section */}
        <div className="font-nova flex items-center max-w-screen-xl mx-auto px-5 sm:px-10 pb-10">
          {/* Popular Dishes Title */}
          <div className="w-full sm:w-1/2 text-left p-5">
            <div className="text">
              <span className="font-nova black border-b-2 border-red-500 uppercase">
                  FAVORITES
              </span>
              <h2 className="my-4 font-nova font-bold text-3xl sm:text-4xl">
                Popular <span className="text-red-500">Dishes</span>
              </h2>
              <p className="text-black font-nova font-bold">
                Discover some of our most popular dishes, crafted with authentic
                flavors and ingredients for an unforgettable experience!<br/> PS: *whisper*: THESE ARE OUR CUSTOMERS FAVORITES!❤️
              </p>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="w-full sm:w-1/2 max-w-[600px] h-[400px] m-auto relative group">
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <div
                style={{
                  backgroundImage: `url(${slides[currentIndex].url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="w-full h-full rounded-3xl bg-no-repeat duration-500"
              ></div>
            </div>

            {/* Left Arrow */}
            <div className="absolute top-[50%] left-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>

            {/* Right Arrow */}
            <div className="absolute top-[50%] right-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
