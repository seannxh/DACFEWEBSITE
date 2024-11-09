import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHours, setShowHours] = useState(false);
  const background =
    "https://png.pngtree.com/thumb_back/fw800/background/20240405/pngtree-asian-food-background-with-various-ingredients-on-rustic-stone-image_15700116.jpg";
  const bottombackground =
    "https://png.pngtree.com/thumb_back/fw800/background/20231222/pngtree-white-paper-texture-background-image_15528216.jpg";
  const slides = [
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipNVn_VP2Wkr-jCleqeH4Mdxaebxy9LnlG33A8m3=s680-w680-h510",
    },
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipPlKIhXlpuQBDlmp1G-8k7GJUnh0OLf0FxD8Qgf=s680-w680-h510",
    },
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipN08RCU4zjSZb-H1ZZBprRf-30GBNvMCAsDSzGy=s680-w680-h510",
    },
    {
      url: "https://lh3.googleusercontent.com/p/AF1QipPf3npwcWR-0oaKgnAXHbAxSZK_9C0yHU84PNyq=s680-w680-h510",
    },
  ];
  const hours = [
    { day: "Sunday", time: "11:00AM - 8:45PM" },
    { day: "Monday", time: "11:00AM - 8:45PM" },
    { day: "Tuesday", time: "11:00AM - 8:45PM" },
    { day: "Wednesday", time: "11:00AM - 8:45PM" },
    { day: "Thursday", time: "11:00AM - 8:45PM" },
    { day: "Friday", time: "11:00AM - 9:45PM" },
    { day: "Saturday", time: "11:00AM - 9:45PM" },
  ];

  const handleMenuClick = () => {
    if (props.token) {
      navigate("/viewmenu");
    } else {
      navigate("/users/signup");
    }
  };

  const handleHoursClick = () => {
    setShowHours(!showHours);
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

  const handleDirectionsClick = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=Don's+Asian+Cuisine,2512+Rice+Boulevard,Houston,TX+77005",
      "_blank"
    );
  };

  return (
    <div className="bg-white text-black">
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
            <h1 className="text-red-700 text-4xl md:text-6xl font-nova mb-4 inline font-bold">
              ASIAN CUISINE
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-6 font-cursive">
              Authentic flavors, unforgettable experiences.
            </p>
            <div>
              <button
                onClick={handleMenuClick}
                className="px-5 py-3 bg-red-700 text-white rounded-lg hover:bg-red-500 font-tomorrow font-medium mr-4"
              >
                VIEW MENU
              </button>
              <button
                onClick={handleHoursClick}
                className="px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-500 font-tomorrow font-medium"
              >
                HOURS
              </button>

              {showHours && (
                <div className=" absolute top-20 left-1/2 transform -translate-x-1/2 w-64 p-4 text-white rounded-lg shadow-lg z-30 border border-gray-300">
                  <h3 className="text-lg font-bold mb-2">Operating Hours</h3>
                  <ul className="space-y-1">
                    {hours.map((item) => (
                      <li key={item.day} className="flex justify-between">
                        <span>{item.day}</span>
                        <span>{item.time}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowHours(false)}
                    className="mt-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="sm:flex items-center max-w-screen-xl mx-auto">
          <div className="sm:w-1/2 p-10">
            <div className="image object-center text-center ">
              <img src="/Dons.jpg" alt="About Us" className="rounded-3xl" />
            </div>
          </div>

          <div className="sm:w-1/2 p-5">
            <div className="text">
              <span className="text-gray-500 border-b-2 border-red-500 uppercase">
                About us
              </span>
              <h2 className="my-4 font-bold text-3xl sm:text-4xl">
                About <span className="text-red-700">Our Team</span>
              </h2>
              <p className="text-black font-tomorrow font-semibold">
                Welcome to Asian Delights, where we bring you the best of
                traditional Asian cuisine with a modern twist. Our chefs craft
                every dish with fresh ingredients and a passion for flavor. Join
                us for an authentic experience that celebrates the diverse
                flavors of Asia.
              </p>
              <br />
              <button
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 font-cursive"
                onClick={handleDirectionsClick}
              >
                Directions
              </button>
            </div>
          </div>
        </div>

        <div className="font-nova flex items-center max-w-screen-xl mx-auto px-5 sm:px-10 pb-10">
          <div className="w-full sm:w-1/2 text-left p-5">
            <div className="text">
              <span className="font-nova black border-b-2 border-red-500 uppercase">
                FAVORITES
              </span>
              <h2 className="my-4 font-nova font-bold text-3xl sm:text-4xl">
                Popular <span className="text-red-700">Dishes</span>
              </h2>
              <p className="text-black font-tomorrow font-bold">
                Discover some of our most popular dishes, crafted with authentic
                flavors and ingredients for an unforgettable experience!
                <br /> PS: *whisper*: THESE ARE OUR CUSTOMERS FAVORITES!❤️
              </p>
            </div>
          </div>

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

            <div className="absolute top-[50%] left-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>

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
