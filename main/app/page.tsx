import Image from "next/image";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import Process from "./Components/Process";
import Brands from "./Components/Brands";
import WhyChooseUs from "./Components/WhyChooseUs";
import OurWork from "./Components/OurWork";
import Faq from "./Components/Faq";
// import AboutUs from "./Components/Aboutus";

export default function Home() {
  return (
  <div>
    <Hero />
    {/* <AboutUs /> */}

    <Process />

    <Services />
    <Brands />
    <WhyChooseUs />
    <OurWork />
    <Faq />

    </div>
  );
}
