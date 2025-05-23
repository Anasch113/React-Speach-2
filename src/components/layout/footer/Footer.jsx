import logo from "../../../assets/footer-logo.svg"

const Footer = () => {
  return (
    <footer className="bg-black text-white p-5 md:p-10">
      <div className="w-full md:w-1/3  md:mb-0">
        {/* <h2 className="text-xl md:text-3xl font-semibold md:ml-[13%]">Let there be change</h2> */}
      </div>
      <div className="flex items-end">
        <div className="w-1/2">
          <div className="container mx-auto flex flex-wrap justify-around items-center text-xs">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="flex flex-col space-y-2">
                <a className="hover:text-gray-300 hover-underline-animation w-[70px]" href="/about-us">About Us</a>
              </div>
              <div className="flex flex-col space-y-2">
                <a className="hover:text-gray-300 hover-underline-animation mt-2 w-[78px]" href="/contact-us">Contact Us</a>
              </div>
              <div className="flex flex-col space-y-2">
                {/* <a className="hover:text-gray-300 hover-underline-animation mt-2 w-[130px]" href="/preference">Preference Center</a> */}
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex flex-col space-y-2">
                <a className="hover-underline-animation w-[130px]" href="/privacy">Privacy Statement</a>
                <a className="hover-underline-animation w-[145px]" href="/term">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
          <div className=" mt-8 text-start md:ml-[8%] w-full">
            <p className="text-xs md:mb-0 mb-4 absolute md:text-sm">© 2025 Captify.live by Bradley Reporting</p>
          </div>
        </div>
        <div className="flex gap-20 justify-center opacity-50 w-1/2 h-[500px]">
          {/* <img src={logo} alt="Logo" /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
