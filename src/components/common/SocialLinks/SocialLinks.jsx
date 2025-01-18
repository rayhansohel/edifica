import { LuLinkedin } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";


const SocialLinks = () => {
  return (
    <div>
      {/* social icons */}
      <div className="flex gap-4 items-center">
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 border border-base-300 flex items-center justify-center rounded-lg hover:text-accent transition-colors"
        >
          <LuLinkedin className="text-lg" />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 border border-base-300 flex items-center justify-center rounded-lg hover:text-accent transition-colors"
        >
          <FiFacebook className="text-lg" />
        </a>
        <a
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 border border-base-300 flex items-center justify-center rounded-lg hover:text-accent transition-colors"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 border border-base-300 flex items-center justify-center rounded-lg hover:text-accent transition-colors"
        >
          <FaInstagram className="text-lg" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;