import { Link } from "react-router-dom";
import BrandLogo from "../../assets/logo/edifica-logo.png";
import FooterMenu from "../common/Menu/FooterMenu";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaHeadphonesAlt } from "react-icons/fa";
import SocialLinks from "../common/SocialLinks/SocialLinks";

const Footer = () => {
  return (
    <div className="min-h-20 bg-secondary border-t border-base-300 pt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-box border border-base-300 p-6 space-y-4">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img src={BrandLogo} alt="Brand Logo" className="w-10" />
                <h3 className="uppercase text-4xl font-semibold tracking-wider">
                  Edifica
                </h3>
              </div>
            </Link>
            <p>
              Edifica simplifies building management with modern tools,
              enhancing efficiency.
            </p>
            <div>
              <SocialLinks />
            </div>
          </div>

          <div className="border border-base-300 p-6 rounded-box">
            <h3 className="uppercase mb-2">Page Links</h3>
            <div>
              <FooterMenu />
            </div>
          </div>

          <div className="border border-base-300 p-6 space-y-2 rounded-box">
            <h3 className="uppercase mb-2">Contact Info</h3>
            <div className="flex items-center gap-2 ">
              <div className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center">
                <FiMapPin />
              </div>
              <p>Uttara, Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center">
                <HiOutlineMail />
              </div>
              <p>support@example.com</p>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="w-8 h-8 border border-base-300 rounded-md flex items-center justify-center">
                <FaHeadphonesAlt />
              </div>
              <p>+880 1234 456 789</p>
            </div>
          </div>

          <div className="border border-base-300 p-6 rounded-box">
            <h3 className="uppercase mb-3">Newsleter</h3>
            <p>
              Subscribe to our newsletter and stay updated with the property
              insights delivered straight to your inbox.
            </p>
            <div className="flex w-full mt-5">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 input-sm rounded-l-md focus:outline-none bg-base-300"
              />
              <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="h-10 w-full px-2 border border-base-300 rounded-lg flex justify-center items-center">
            <p>
              <Link to="/" className="text-accent font-semibold">
                Edifica
              </Link>{" "}
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
