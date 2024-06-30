
import "./cards.styles.css";
import Wrapper from "../layout/wrapper/Wrapper";
import CardLayout from "../layout/card-layout/CardLayout";
import { cardsData } from "../../../data/cardsData";

const Cards = () => {


  return (
    <div className="mt-20">
      <Wrapper>
        <div className="flex justify-center items-center">
        <CardLayout cardsData={cardsData} />

        </div>
      </Wrapper>
    </div>
  );
};

export default Cards;
