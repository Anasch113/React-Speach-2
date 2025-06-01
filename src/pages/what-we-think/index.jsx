import CardLayoutClients from "@/components/layout/card-layout/CardLayoutClients";
import { clientsSayCardData } from "../../../data/cardsData";
import CardLayout from "../../components/layout/card-layout/CardLayout";
import Footer from "../../components/layout/footer/Footer";
import FilterButtons from "./components/FilterButtons";

const Think = () => {
  return (
    <div>
      <div className="my-24 px-4 md:px-8 text-white">
        <div className= "text-3xl md:text-7xl font-bold text-center md:text-left">
          What Clients Say
        </div>
        <p className="text-base md:text-2xl md:font-semibold my-8 text-center md:text-left">
          Over the years, we've had the privilege of supporting hundreds of legal professionals, corporate teams and government agencies. Here's what some of them have to say about our services:
        </p>
      </div>
      <FilterButtons />
      <div className="mt-20 px-4">
        <CardLayoutClients cardsData={clientsSayCardData} />
      </div>
      <div className="flex justify-center items-center mt-10">
        {/* <button className="border border-white px-6 py-4 text-white">
          Load More

        </button> */}

      </div>
      <div className="my-24 px-4 md:px-8 text-white">
        <div className="h1 text-5xl font-bold text-center md:text-left">💬 Partner with Us
</div>
        <p className="text-lg md:text-xl font-semibold my-8 text-center md:text-left">Experience the difference that professional, accurate, and timely speech-to-text services can make for your organisation.
        </p>
        <div className="flex justify-center md:justify-start">
          <a href="/contact-us" className="bttnn z-10">Contact Us</a>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Think;
