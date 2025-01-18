import AboutBuilding from "./Components/AboutSection/AboutBuilding";
import OurLocation from "./Components/ContactSection/OurLocation";
import Hero from "./Components/Hero/Hero";

const Home = () => {
    return (
        <div>
            <Hero/>
            <AboutBuilding/>
            <OurLocation/>
        </div>
    );
};

export default Home;