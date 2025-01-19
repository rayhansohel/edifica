import Iframe from "react-iframe";
import SectionTitle from "../../components/common/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import SocialLinks from "../../components/common/SocialLinks/SocialLinks";

const Contact = () => {
  return (
    <div className="min-h-[calc(100vh-344px)]">
      <Helmet>
        <title>Contact- Edifica</title>
      </Helmet>

      <section className="w-full container mx-auto py-8 md:py-20 px-4">
        <SectionTitle title="Contact Us" subtitle="Get in touch" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Contact Information Section */}
          <div className="space-y-6 col-span-1">
            <h3 className="mb-4 uppercase text-accent">Contact Info</h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-base-200 flex items-center justify-center">
                  <CiMail className="text-3xl" />
                </div>
                <div className="flex flex-col">
                  <h3 className="uppercase">Mail Me</h3>
                  <p className="flex items-center">
                    <a
                      href="mailto:arayhanohel@gmail.com"
                      className="hover:text-accent opacity-70"
                    >
                      support@example.com
                    </a>
                  </p>
                </div>
              </div>
              {/* Phone */}
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-base-200 flex items-center justify-center">
                  <FiPhone className="text-3xl" />
                </div>
                <div className="flex flex-col">
                  <h3 className="uppercase">Contact Me</h3>
                  <p className="flex items-center">
                    <a
                      href="tel:+8801719403406"
                      className="hover:text-accent opacity-70"
                    >
                      +880 1234 456 789
                    </a>
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-base-200 flex items-center justify-center">
                  <IoLocationOutline className="text-3xl" />
                </div>
                <div className="flex flex-col">
                  <h3 className="uppercase">Location</h3>
                  <p className="flex items-center opacity-70">
                    Uttara, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="col-span-1 md:col-span-2 bg-base-200 p-6 rounded-3xl">
            <h3 className="mb-4 uppercase">Send Message</h3>
            <form>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input input-sm w-full bg-base-300"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input input-sm w-full bg-base-300"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    className="textarea w-full bg-base-300"
                    placeholder="Type your message here..."
                    rows="5"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-sm btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Section 2: Apartment Location Details */}
      <section className="pb-8 md:pb-20 container mx-auto">
        <SectionTitle
          title="Our Location"
          subtitle="Find us in the heart of the city"
        />
        <div className="container mx-auto px-4 mt-4">
          <div className="mt-4 rounded-badge overflow-hidden bg-base-200">
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
      </section>
    </div>
  );
};

export default Contact;
