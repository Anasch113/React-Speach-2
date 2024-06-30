import Wrapper from "../layout/wrapper/Wrapper"
import Carousel from "./Carousel"

const Value = () => {
  return (
    <div className="mt-[7rem] text-white">
        <Wrapper>
            <h1 className="text-center text-[40px] md:text-[120px] font-semibold">360° VALUE</h1>
            <p className="text-center md:-mt-[5rem] font-normal text-[17px] md:text-[24px] ">Every day, we embrace change and create value for all our</p>
            <p className="text-center text-[17px] font-normal md:text-[24px]">stakeholders, in every part of the world.</p>
            <Carousel/>
        </Wrapper>
        
    </div>
  )
}

export default Value