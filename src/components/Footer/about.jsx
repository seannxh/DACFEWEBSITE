import { useState } from "react";

const AboutUs = () => {
  const background =
    "https://lh3.googleusercontent.com/p/AF1QipNJal3ppZxFT-HdD0wvvYZ2dV-hUOu5fjvC_fEo=s680-w680-h510";
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
            <h1 className="text-4xl md:text-6xl font-cursive mb-4 inline font-bold">
              ABOUT{" "}
            </h1>
            <h1 className="text-red-700 text-4xl md:text-6xl font-cursive mb-4 inline font-bold">
              US
            </h1>
            <div className="flex my-5">
              <div className="flex-1 border-t-2 border-red-700"></div>
              <div className="flex-1 border-t-2 border-white-700"></div>
            </div>
            <h4 className="text-3xl my-5 font-cursive">What We Strive For!</h4>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-6 font-cursive">
              At Don's Asian Cuisine, we're more than a team – we're a family
              united by our passion for authentic Asian flavors. Every dish is
              crafted with dedication, inspired by tradition, and made with
              fresh ingredients to bring you a taste of home. Join us on a
              journey through vibrant flavors and cultural warmth.
            </p>
            <div>
              <section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
                    <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 p-6 rounded-2xl white-outline">
                      <div className="flex gap-5">
                        <div className="font-cursive text-2xl font-bold text-red-700">
                          150+
                        </div>
                        <div className="flex-1">
                          <h4 className="font-cursive text-xl font-semibold mb-2">
                            <span className="text-white">Customer</span>{" "}
                            <span className="text-red-700">Satisfaction</span>
                          </h4>
                          <p className="font-cursive text-s text-white leading-5">
                            We are committed to providing exceptional service,
                            ensuring every customer leaves with a smile and a
                            memorable dining experience that reflects our
                            dedication to quality and respect.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 p-6 rounded-2xl white-outline">
                      <div className="flex gap-5">
                        <div className="font-cursive text-2xl font-bold text-red-700">
                          #1
                        </div>
                        <div className="flex-1">
                          <h4 className="font-cursive text-xl font-semibold mb-2">
                            <span className="text-white">Our Team's</span>{" "}
                            <span className="text-red-700">Goal</span>
                          </h4>
                          <p className="font-cursive text-s text-white leading-5">
                            Our dedicated team brings passion and expertise to
                            every dish, ensuring that each meal reflects our
                            commitment to authentic flavors and exceptional
                            service. We are proud to be the backbone of Don's
                            Asian Cuisine, where quality and tradition meet.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 p-6 rounded-2xl white-outline">
                      <div className="flex gap-5">
                        <div className="font-cursive text-2xl font-bold text-red-700">
                          100%
                        </div>
                        <div className="flex-1">
                          <h4 className="font-cursive text-xl font-semibold mb-2">
                            <span className="text-white">Authen</span>
                            <span className="text-red-700">ticity</span>
                          </h4>
                          <p className="font-cursive text-s text-white leading-5">
                            We take pride in preserving authentic flavors and
                            culinary traditions, bringing the essence of Asian
                            cuisine to every dish we serve. Our commitment to
                            authenticity is at the heart of everything we do.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="mt-10">
                <h1 className="text-2xl md:text-3xl font-cursive mb-4 inline font-bold">
                  Contact{" "}
                </h1>
                <h1 className="text-2xl md:text-3xl font-cursive mb-4 text-red-700 inline font-bold">
                  US
                </h1>
                <div className="flex justify-center">
                  <div className=" p-4 rounded-lg shadow-md mb-4">
                    <section className="font-semibold text-white">
                      <p>📌 Address: 2512 Rice Blvd, Houston, TX 77005</p>
                      <p>📞 Phone: (713) 533-1188</p>
                      <p>📧 Email: customer@donsasiancuisine.com</p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
