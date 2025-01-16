import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="min-h-20 bg-base-200 border-t border-base-300 flex justify-center items-center">
            <p className="p-4">
            <Link to="/" className="text-accent font-semibold">
              Edifica
            </Link>
            {" "} © {new Date().getFullYear()}
            . All rights reserved.
          </p>
        </div>
    );
};

export default Footer;