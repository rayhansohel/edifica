import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";


const SocialLinks = () => {
  return (
    <div>
      {/* social icons */}
      <div className="flex gap-4 items-center">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 border border-base-300 flex items-center justify-center rounded-lg hover:text-accent transition-colors duration-600"
        >
          <FiFacebook className="text-lg" />
        </a>
        <a
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 border border-base-300 flex items-center justify-center rounded-lg hover:text-accent transition-colors duration-600"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 border border-base-300 flex items-center justify-center rounded-lg hover:text-accent transition-colors duration-600"
        >
          <FaInstagram className="text-lg" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;