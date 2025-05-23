import Wrapper from "../layout/wrapper/Wrapper"
import Carousel from "./Carousel"

const Value = () => {
  return (
    <div className="mt-[7rem] text-white">
        <Wrapper>
            <h1 className="text-center text-[22px] md:text-[40px] font-semibold">Our Commitment to Data Security</h1>
            {/* <p className="text-center  font-normal text-[14px] md:text-[18px] ">Every day, we foster innovation and create value for our stakeholders in every corner of the world.</p> */}
            {/* <p className="text-center text-[17px] font-normal md:text-[24px]">stakeholders, in every part of the world.</p> */}
            <Carousel/>
        </Wrapper>
        
    </div>
  )
}

export default Value