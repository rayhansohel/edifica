import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Iframe from "react-iframe";
import SectionTitle from "../../components/common/SectionTitle/SectionTitle";
import Marquee from "react-fast-marquee";
import ThemeContext from "../../context/ThemeContext";
import Faqs from "../../components/common/Faq/Faqs";
import { Helmet } from "react-helmet-async";

const About = () => {
  const [apartments, setApartments] = useState([]);
  const { theme } = useContext(ThemeContext); // Get the current theme

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/all-apartments"
        );
        const data = response.data;

        if (Array.isArray(data)) {
          setApartments(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div>
      <Helmet>
        <title>About- Edifica</title>
      </Helmet>
      <div>
        {/* Section 1: About Building */}
        <section className="py-8 md:py-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="About Building"
              subtitle="Shaping the Future"
            />

            <div className="mt-4 grid grid-cols-1 gap-6">
              <div className="rounded-badge overflow-hidden">
                <img
                  src="https://i.ibb.co.com/qCv0PB3/about.jpg"
                  alt="about us"
                  className="object-cover h-full w-full hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Feature 1 */}
                  <div className="border border-base-300 p-6 rounded-badge hover:bg-base-200 transition-color duration-300 ease-in-out">
                    <h3 className="text-md uppercase font-semibold mb-2">
                      Modern Architecture
                    </h3>
                    <p>
                      Designed with sleek lines and innovative concepts, our
                      building exemplifies contemporary style and functionality.
                    </p>
                  </div>
                  {/* Feature 2 */}
                  <div className="border border-base-300 p-6 rounded-badge hover:bg-base-200 transition-color duration-300 ease-in-out">
                    <h3 className="text-md uppercase font-semibold mb-2">
                      Sustainable Design
                    </h3>
                    <p>
                      Equipped with eco-friendly, building is designed to
                      minimize environmental impact while maximizing efficiency.
                    </p>
                  </div>
                  {/* Feature 3 */}
                  <div className="border border-base-300 p-6 rounded-badge hover:bg-base-200 transition-color duration-300 ease-in-out">
                    <h3 className="text-md uppercase font-semibold mb-2">
                      Prime Location
                    </h3>
                    <p>
                      Strategically located in the heart of the city, offering
                      easy access to essential services and vibrant local
                      attractions.
                    </p>
                  </div>
                  {/* Feature 4 */}
                  <div className="border border-base-300 p-6 rounded-badge hover:bg-base-200 transition-color duration-300 ease-in-out">
                    <h3 className="text-md uppercase font-semibold mb-2">
                      Unparalleled Amenities
                    </h3>
                    <p>
                      From a state-of-the-art gym to a relaxing lounge, the
                      building offers amenities to suit every lifestyle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Image Marquee */}
        <section className="pb-8 md:pb-20 container mx-auto px-4">
          <SectionTitle
            title="Image Gallery"
            subtitle="See and choose your dream"
          />
          {apartments.length > 0 ? (
            <div className="mt-4">
              <Marquee
                speed={50}
                gradient={true}
                pauseOnHover={true}
                gradientColor={theme === "dark" ? "black" : "white"}
              >
                {apartments.map((apartment) => (
                  <a
                    key={apartment._id}
                    href={`/apartments/${apartment._id}`}
                    className="block mx-4"
                  >
                    <img
                      src={apartment.image}
                      alt={`Apartment ${apartment.apartmentNo}`}
                      className="object-cover w-60 md:w-80 rounded-badge transition-transform duration-500 ease-in-out"
                    />
                  </a>
                ))}
              </Marquee>
            </div>
          ) : (
            <p className="text-center">
              No apartments available at the moment.
            </p>
          )}
        </section>

        {/* Section 3: FAQs*/}
        <section>
          <Faqs />
        </section>
      </div>
    </div>
  );
};

export default About;
