import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_x9p1m6d', 'template_11ni011', form.current, {
        publicKey: 'wdB1IvZQVrkij5h20',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold font-cursive mb-4">Contact Us</h2>

        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <section className="font-semibold text-gray-700">
            <p>📌 Address: 2512 Rice Blvd, Houston, TX 77005</p>
            <p>📞 Phone: (713) 533-1188</p>
            <p>📧 Email: customer@donsasiancuisine.com</p>
          </section>
        </div>

        <p className="font-cursive text-center mb-6">
          Please feel free to contact us for any questions, concerns, or feedback!<br/>
          We are ALWAYS looking to help and strengthen our time together with you!
        </p>

        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
          <div>
            <label className="font-cursive block text-left font-bold text-gray-800 mb-1">
              Name<span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="font-cursive block text-left font-bold text-gray-800 mb-1">
              Email<span className="text-red-700">*</span>
            </label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="font-cursive block text-left font-bold text-gray-800 mb-1">
              Message<span className="text-red-700">*</span>
            </label>
            <textarea
              name="message"
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none resize-vertical min-h-[100px]"
            />
          </div>
          <input
            type="submit"
            value="Send"
            className="w-full bg-red-700 text-white font-bold py-2 rounded cursor-pointer hover:bg-blue-600 transition"
          />
        </form>
      </div>

      <div className="w-full max-w-xl mt-10 rounded-lg shadow-lg overflow-hidden">
        <iframe
          width="100%"
          height="250"
          src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=2512%20Rice%20Boulevard,%20Houston,%20TX%2077005+(Don's%20Asian%20Cuisine)&amp;t=h&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          title="Location Map"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
