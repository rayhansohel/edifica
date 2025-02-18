import { TiPointOfInterest } from "react-icons/ti";
import SectionTitle from "../../../../components/common/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Feature = () => {
  return (
    <section className="pb-8 md:pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Modern Living"
          subtitle="Luxury, comfort and convenience"
        />

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="rounded-box overflow-hidden">
            <img
              src="https://i.ibb.co.com/KFRjY0z/register.jpg"
              alt="Modern Apartment"
              className="object-cover w-full hover:scale-110 transition-transform duration-700 ease-in-out"
            />
          </div>

          {/* Text & Features Section */}
          <div className="flex flex-col justify-center">
            <p className="text-justify">
              Experience a new level of modern living with our thoughtfully
              designed apartments. Combining elegance and innovation, each unit
              is crafted to offer **a seamless blend of comfort, style, and
              functionality.** From breathtaking interiors to cutting-edge
              amenities, our spaces are designed for **luxury and convenience**
              like never before.
            </p>

            {/* Feature List */}
            <div className="mt-4">
              <ul className="space-y-2">
                <li className="flex gap-2 items-center">
                  <TiPointOfInterest className="text-accent text-xl" />
                  Eco-Friendly Smart Homes
                </li>
                <li className="flex gap-2 items-center">
                  <TiPointOfInterest className="text-accent text-xl" />
                  Contemporary Open-Plan Design
                </li>
                <li className="flex gap-2 items-center">
                  <TiPointOfInterest className="text-accent text-xl" />
                  Prime Urban Locations
                </li>
                <li className="flex gap-2 items-center">
                  <TiPointOfInterest className="text-accent text-xl" />
                  State-of-the-Art Fitness Centers
                </li>
                <li className="flex gap-2 items-center">
                  <TiPointOfInterest className="text-accent text-xl" />
                  24/7 Security & Smart Access Control
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link to={"/apartment"} className="btn btn-sm btn-accent">
                Explore Apartment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
