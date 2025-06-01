/* eslint-disable react/prop-types */

import { IoIosArrowForward } from 'react-icons/io'

const CardLayoutClients = ({ cardsData }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5 md:gap-y-16 w-full ">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="relative overflow-hidden group h-[440px] max-w-[400px] w-full cursor-pointer"
          >
            <div className="absolute p-3 z-40">
              <h1 className="text-white text-base font-medium">
                {card.heading}
              </h1>
              <p className="text-sm mt-6 text-white">{card.subHeading}</p>
            </div>
            <img
              src={card.img}
              alt=""
              className="object-cover h-full w-full z-20"
            />
            <div className="bg-black  absolute inset-0 flex h-[85%] items-center justify-center text-left text-sm p-5 z-30 transform ease-linear transition-transform duration-500 translate-x-full group-hover:translate-x-0">
              <p className="text-white mt-20">{card.para}</p>
            </div>
            <div className="bg-black w-full absolute bottom-0 h-[15%] flex items-center justify-end p-3 z-30 transform ease-linear transition-transform duration-500 translate-y-full group-hover:translate-y-0">
              <div className="hover-underline-animation font-normal flex items-center space-x-2">
                <a href={card.link} className="cursor-pointer text-white">
                  Sign-In
                </a>
                <span>
                  <IoIosArrowForward
                    size={16}
                    className="absolute -mt-[1.2rem] ml-[4rem]"
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardLayoutClients