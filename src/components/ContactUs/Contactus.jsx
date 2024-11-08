import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import FooterWithLogo from '../Footer/Footer';

const StyledContactForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 600px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #333;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  input[type='submit'] {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const MapContainer = styled.div`
  width: 600px;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: 250px;
`;

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
    <div>
      <StyledContactForm>
        <h2>Contact Us</h2>
        <section>
          <p>📌 Address: 2512 Rice Blvd, Houston, TX 77005</p>
          <p>📞 Phone: (713) 533-1188</p>
          <p>📧 Email: customer@donsasiancuisine.com</p>
        </section>
        <p style={{ textAlign: `center`}}>Please feel free to contact us for any questions, concerns or feedbacks!<br/>
            We are ALWAYS! looking to help and stregthen our time together with you!
        </p>
        <FormContainer ref={form} onSubmit={sendEmail}>
          <div>
            <label>Name<span style={{ color: "red" }}>*</span></label>
            <input type="text" name="user_name" required />
          </div>
          <div>
            <label>Email<span style={{ color: "red" }}>*</span></label>
            <input type="email" name="user_email" required />
          </div>
          <div>
            <label>Message<span style={{ color: "red" }}>*</span></label>
            <textarea name="message" required />
          </div>
          <input type="submit" value="Send" />
        </FormContainer>
      </StyledContactForm>

      <MapContainer>
        <iframe
          width="100%"
          height="500"
          src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=2512%20Rice%20Boulevard,%20Houston,%20TX%2077005+(Don's%20Asian%20Cuisine)&amp;t=h&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          title="Location Map"
        ></iframe>
      </MapContainer>
        <div/>
    </div>
)}

export default ContactUs;
