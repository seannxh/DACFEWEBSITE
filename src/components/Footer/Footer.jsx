import { Typography } from "@material-tailwind/react";
import FaceBook from '../../assets/facebook.png';
import X from '../../assets/x.png';
import Instagram from '../../assets/instagram.png';

function FooterWithLogo() {
  return (
    <footer className="w-full bg-black text-white p-5">
      <div className="flex flex-col md:flex-row md:justify-between items-center max-w-3xl mx-auto py-1 px-4">

        <section className="text-left md:w-1/2 md:pr-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>📌 <strong>Address:</strong> 2512 Rice Blvd, Houston, TX 77005</p>
          <p>📞 <strong>Phone:</strong> (713) 533-1188</p>
          <p>📧 <strong>Email:</strong> customer@donsasiancuisine.com</p>
        </section>


        <div className="hidden md:block border-r border-white h-full mx-8"></div>

        <section className="text-center md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <p className="text-lg mb-4">Stay connected on social media:</p>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={FaceBook} alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={Instagram} alt="Instagram" className="w-8 h-8" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src={X} alt="X" className="w-8 h-8" />
            </a>
          </div>
        </section>
      </div>
      <hr className="my-8 border-white w-full" />
      <div className="flex flex-col items-center justify-center gap-y-3 gap-x-12 text-center">
        <ul className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8 font-nova">
          <li>
            <Typography
              as="a"
              href="/home"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              ABOUT US
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/home"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              LICENSE
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/home"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              CONTRIBUTE
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/contactus"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              CONTACT US
            </Typography>
          </li>
        </ul>
      </div>

      <Typography color="white" className="text-center font-nova mt-8">
        &copy; {`${new Date().getFullYear()} DON'S ASIAN CUISINE`}
      </Typography>
    </footer>
  );
}

export default FooterWithLogo;
