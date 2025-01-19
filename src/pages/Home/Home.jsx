import { Helmet } from "react-helmet-async";
import AboutBuilding from "./Components/AboutSection/AboutBuilding";
import OurLocation from "./Components/ContactSection/OurLocation";
import Hero from "./Components/Hero/Hero";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home- Edifica</title>
      </Helmet>
      <Hero />
      <AboutBuilding />
      <OurLocation />
    </div>
  );
};

export default Home;
