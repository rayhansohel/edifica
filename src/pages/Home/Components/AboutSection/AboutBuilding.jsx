import SectionTitle from "../../../../components/common/SectionTitle/SectionTitle";

const AboutBuilding = () => {
  return (
    <section className="py-8 md:py-20">
      <div className="container mx-auto px-4">
        <SectionTitle title="About Building" subtitle="Shaping the Future" />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-badge overflow-hidden">
            <img
              src="https://i.ibb.co.com/KFRjY0z/register.jpg"
              alt="about us"
              className="object-cover h-full hover:scale-110 transition-transform duration-700 ease-in-out"
            />
          </div>
          <div>
            <p className="text-justify">At Edifica, we believe that building is more than just construction, it's about creating spaces that inspire, endure, and serve a purpose. From architectural design to project completion, our team is dedicated to transforming ideas into tangible structures that reflect both functionality and beauty. Every project we take on is an opportunity to craft environments where people thrive and communities grow.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Feature 1 */}
              <div className="border border-base-300 p-6 rounded-3xl hover:bg-base-200 transition-color duration-300 ease-in-out">
                <h3 className="text-md uppercase font-semibold mb-2">
                  Modern Architecture
                </h3>
                <p>
                  Designed with sleek lines and innovative concepts, our
                  building exemplifies contemporary style and functionality.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="border border-base-300 p-6 rounded-3xl hover:bg-base-200 transition-color duration-300 ease-in-out">
                <h3 className="text-md uppercase font-semibold mb-2">
                  Sustainable Design
                </h3>
                <p>
                  Equipped with eco-friendly, building is designed
                  to minimize environmental impact while maximizing efficiency.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="border border-base-300 p-6 rounded-3xl hover:bg-base-200 transition-color duration-300 ease-in-out">
                <h3 className="text-md uppercase font-semibold mb-2">
                  Prime Location
                </h3>
                <p>
                  Strategically located in the heart of the city, offering easy
                  access to essential services and vibrant local attractions.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="border border-base-300 p-6 rounded-3xl hover:bg-base-200 transition-color duration-300 ease-in-out">
                <h3 className="text-md uppercase font-semibold mb-2">
                  Unparalleled Amenities
                </h3>
                <p>
                  From a state-of-the-art gym to a relaxing lounge, the building
                  offers amenities to suit every lifestyle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
