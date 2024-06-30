import { cardsData } from "../../../data/cardsData";
import CardLayout from "../../components/layout/card-layout/CardLayout";
import Footer from "../../components/layout/footer/Footer";
import FilterButtons from "./components/FilterButtons";

const Think = () => {
  return (
    <div>
      <div className="my-24 px-4 md:px-8 text-white">
        <div className= "text-3xl md:text-7xl font-bold text-center md:text-left">
          Leverage AI insights
        </div>
        <p className="text-base md:text-2xl md:font-semibold my-8 text-center md:text-left">
          Discover our insights and real client success stories showcasing how
          our AI-driven legal technology
          <br className="hidden md:block" />
          helps you navigate key changes in litigation and achieve faster, more
          efficient results.
        </p>
      </div>
      <FilterButtons />
      <div className="mt-20 px-4">
        <CardLayout cardsData={cardsData} />
      </div>
      <div className="flex justify-center items-center mt-10">
        <button className="border border-white px-6 py-4 text-white">
          Load More

        </button>

      </div>
      <div className="my-24 px-4 md:px-8 text-white">
        <div className="h1 text-5xl font-bold text-center md:text-left">Get Foresight on the go</div>
        <p className="text-lg md:text-xl font-semibold my-8 text-center md:text-left">Download the Bradley Reporting Foresight app to read, watch, or listen to our best thinking—and join
          <br className="hidden md:block" />our exclusive “Foresight in 15” live digital events for quick takes on big ideas.
        </p>
        <div className="flex justify-center md:justify-start">
          <button className="bttnn z-10">Get Foresight</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Think;
