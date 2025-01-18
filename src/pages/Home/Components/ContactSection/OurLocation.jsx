import Iframe from "react-iframe";
import SectionTitle from "../../../../components/common/SectionTitle/SectionTitle";

const OurLocation = () => {
  return (
    <section className="pb-8 md:pb-20">
      <SectionTitle
        title="Our Location"
        subtitle="Find us in the heart of the city"
      />
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col gap-8 items-center justify-center">

          {/* Address*/}
          <div className="border border-base-300 p-6 rounded-3xl hover:bg-base-200 transition-color duration-300 ease-in-out w-60">
            <h3 className="text-md uppercase font-semibold mb-2">
              Appartment Address
            </h3>
            <p>Sector-13, Uttara, Dhaka</p>
            <p>Bangladesh-1230</p>
          </div>

          <div className="max-w-4xl text-justify">
            <p>
              Located in the vibrant neighborhood of Sector 13, Uttara, our
              apartment offers convenient access to parks, shopping centers, and
              public transportation. Whether you're commuting to work or
              exploring the city, our location is perfect for you.
            </p>
          </div>
        </div>
        <div>
          <div className="mt-8 rounded-badge overflow-hidden bg-base-200">
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5362.455986141798!2d90.38611587424055!3d23.868753380539204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c410ec3b89c7%3A0xf55205f7f62d521d!2sUttara%20Sector%2013%20Park!5e0!3m2!1sen!2sbd!4v1737212202793!5m2!1sen!2sbd"
              width="100%"
              height="300px"
              id=""
              className=""
              display="block"
              position="relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;
