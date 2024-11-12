import { Typography } from "@material-tailwind/react";
import FaceBook from "../../assets/facebook.png";
import X from "../../assets/x.png";
import Instagram from "../../assets/instagram.png";

function FooterWithLogo() {
  return (
    <footer className="w-full bg-black text-white text-xs">
      <div className="flex flex-col md:flex-row md:justify-between items-center max-w-3xl mx-auto py-2 px-5 space-y-4 md:space-y-0">
        <section className="text-left md:w-1/3">
          <h2 className="text-lg font-semibold mb-1">Contact Us</h2>
          <p>
            📌 <strong>Address:</strong> 2512 Rice Blvd, Houston, TX 77005
          </p>
          <p>
            📞 <strong>Phone:</strong> (713) 533-1188
          </p>
          <p>
            📧 <strong>Email:</strong> customer@donsasiancuisine.com
          </p>
        </section>

        <section className="text-center md:w-1/3">
          <h2 className="text-lg font-semibold mb-1">Follow Us</h2>
          <div className="flex justify-center space-x-4 mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={FaceBook} alt="Facebook" className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src={X} alt="X" className="w-6 h-6" />
            </a>
          </div>
        </section>
      </div>

      <hr className="my-2 border-gray-700 w-full" />

      <div className="flex flex-col items-center justify-center text-center gap-2 mb-2">
        <ul className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <li>
            <Typography
              as="a"
              href="/about"
              color="white"
              className="transition-colors hover:text-blue-500"
            >
              ABOUT US
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/privacypolicy"
              color="white"
              className="transition-colors hover:text-blue-500"
            >
              PRIVACY POLICY
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/contactus"
              color="white"
              className="transition-colors hover:text-blue-500"
            >
              CONTACT US
            </Typography>
          </li>
        </ul>
      </div>

      <Typography color="white" className="text-center mt-1 mb-2">
        &copy; {new Date().getFullYear()} Don's Asian Cuisine. All Rights
        Reserved.
      </Typography>
    </footer>
  );
}

export default FooterWithLogo;
