import Image from "next/image";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import Process from "./Components/Process";

export default function Home() {
  return (
  <div>
    <Hero />
    <Process />

    <Services />

    </div>
  );
}
