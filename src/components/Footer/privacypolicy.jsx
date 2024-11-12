import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [useInfo] = useState([
    "Process orders and reservations",
    "Improve our website’s functionality",
    "Respond to inquiries and customer service requests",
    "Send marketing communications (if you've opted-in)",
  ]);

  const [youRights] = useState([
    "Access, update, or delete your personal information",
    "Opt-out of receiving marketing communication at any time",
  ]);

  const [infoCollect] = useState([
    "Personal Information: When you sign up for an account, make a reservation, or place an order, we collect information such as your name, email address, phone number, and payment details.",
    "Usage Information: We may collect information about how you interact with our website, including IP addresses, browser type, and pages visited.",
    "Cookies: We use cookies to enhance your experience on our website. Cookies help us analyze website traffic and remember your preferences.",
  ]);

  return (
    <div className="flex flex-col items-center my-8">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold font-cursive mb-4">Privacy Policy</h2>

        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="font-bold text-lg font-tomorrow">
            <span className="text-black">Information </span>
            <span className="text-red-700">We Collect</span>
          </h2>
          <br />
          <section className="font-semibold text-gray-700">
            <ul>
              <li className="list-disc pl-5:">
                {infoCollect.map((collect, i) => {
                  return (
                    <li className="mb-2" key={i}>
                      {collect}
                    </li>
                  );
                })}
              </li>
              <br />
            </ul>
          </section>
          <br />
          <h2 className="font-bold text-lg font-tomorrow">
            <span className="text-black">How We Use </span>
            <span className="text-red-700">Your Information</span>
          </h2>
          <br />
          <section className="font-semibold text-gray-700">
            <ul className="list-disc pl-5:">
              {useInfo.map((info, i) => {
                return (
                  <li className="mb-2" key={i}>
                    {info}
                  </li>
                );
              })}
            </ul>
          </section>
          <br />
          <h2 className="font-bold text-lg font-tomorrow">
            <span className="text-black">Data </span>
            <span className="text-red-700">Security</span>
          </h2>
          <br />
          <section className="font-semibold text-gray-700">
            <p>
              We implement appropriate security measures to protect your
              personal information. However, please be aware that no method of
              transmission over the internet or electronic storage is completely
              secure.
            </p>
          </section>
          <br />
          <h2 className="font-bold text-lg font-tomorrow">
            <span className="text-black">Coo</span>
            <span className="text-red-700">kies</span>
          </h2>
          <br />
          <section className="font-semibold text-gray-700">
            <p>
              We use cookies to enhance your experience on our website. Cookies
              help us analyze website traffic and remember your preferences. You
              can choose to disable cookies in your browser settings.
            </p>
          </section>
          <br />
          <h2 className="font-bold text-lg font-tomorrow">
            <span className="text-black">Third Party </span>
            <span className="text-red-700">Services</span>
          </h2>
          <br />
          <section className="font-semibold text-gray-700">
            <p>
              We do not share your personal information with third parties for
              marketing purposes. We may share information with third-party
              service providers to complete transactions, process payments, or
              improve services.
            </p>
          </section>
          <br />
          <h2 className="font-bold text-lg font-tomorrow">
            <span className="text-black">Your </span>
            <span className="text-red-700">Rights</span>
          </h2>
          <br />
          <section className="font-semibold text-gray-700">
            <h4>You have the right to:</h4>
            <br />
            <ul className="list-disc pl-5:">
              {youRights.map((rights, i) => {
                return (
                  <li className="mb-2" key={i}>
                    {rights}
                  </li>
                );
              })}
            </ul>
          </section>
          <br />
          <h2 className="font-bold text-lg font-tomorrow">
            <span className="text-black">Changes To This </span>
            <span className="text-red-700">Private Policy</span>
          </h2>
          <br />
          <section className="font-semibold text-gray-700">
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with the updated date.
            </p>
          </section>
          <br />
          <h2 className="font-bold text-lg font-tomorrow">
            <span className="text-black">Contact </span>
            <span className="text-red-700">Us</span>
          </h2>
          <br />
          <section className="font-semibold text-gray-700">
            <p>📌 Address: 2512 Rice Blvd, Houston, TX 77005</p>
            <p>📞 Phone: (713) 533-1188</p>
            <p>📧 Email: customer@donsasiancuisine.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
