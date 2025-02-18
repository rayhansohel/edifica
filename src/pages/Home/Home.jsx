import { Helmet } from "react-helmet-async";
import AboutBuilding from "./Components/AboutSection/AboutBuilding";
import OurLocation from "./Components/ContactSection/OurLocation";
import Hero from "./Components/Hero/Hero";
import AvailableCoupons from "./Components/AvailableCoupon/AvailableCoupons";
import RecentApartments from "./Components/RecentApartments/RecentApartments";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Edifica</title>
      </Helmet>
      <Hero />
      <AboutBuilding />
      <RecentApartments />
      <AvailableCoupons />
      <OurLocation />
    </div>
  );
};

export default Home;
