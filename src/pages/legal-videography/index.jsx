import legalvideo from "../../assets/legal-video.jpeg"
import legalvideointro from "../../assets/legal-video-expertise.jpeg"
import { FaGavel, FaCamera, FaTruck } from 'react-icons/fa'; // Import icons from FontAwesome (as an example)
import Footer from "@/components/layout/footer/Footer";

const LegalVideography = () => {
    const whyChooseUs = [
        {
            id: 1,
            icon: <FaGavel />,
            title: 'Expert Legal Knowledge',
            paragraph: 'Our understanding of both U.S. and Australian legal standards ensures that all video recordings are tailored to meet the specific requirements of your jurisdiction.',
        },
        {
            id: 2,
            icon: <FaCamera />,
            title: 'Professional Quality',
            paragraph: 'We use the latest videography equipment to capture clear, high-definition video and audio that accurately reflects your legal proceedings.',
        },
        {
            id: 3,
            icon: <FaTruck />,
            title: 'Flexible and Mobile',
            paragraph: 'Whether you’re in a remote part of Australia or anywhere in the Asia Pacific, we are ready to provide the services you need without compromising on quality.',
        }
    ];
    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                {/* <Header/> */}
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24  md:pr-20 text-white md:w-1/2">
                        <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
                            Professional Legal Videography Services for Lawyers Worldwide
                        </div>
                        <p className="lg:text-lg   font-normal my-8 text-center md:text-left">
                            We specialise in delivering high-quality legal videography services across Australia and the Asia Pacific. Whether you&apos;re a U.S. lawyer conducting depositions or an Australian lawyer involved in hearings outside of traditional courtrooms, our experienced team ensures precise, reliable recordings that meet all legal standards.
                        </p>
                        <button className="mt-6 px-6 mx-auto md:mx-0 w-full md:w-auto py-3 bg-[#A100FF] text-white ">Learn More</button>
                    </div>
                    <img src={legalvideo} alt="" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-top object-cover" />

                </section>

                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Expertise You Can Trust</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">With years of experience in the legal videography field, we understand the critical role video evidence plays in legal proceedings. Our team adheres to strict technical standards to provide seamless, accurate, and clear video recordings, helping you present compelling evidence in court or depositions.</p>
                    <img src={legalvideointro} alt="" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>



                <section className="text-white md:px-4  text-center py-12 flex justify-center items-center flex-col ">
                    <h2 className="text-2xl md:text-3xl font-bold">

                        Why Choose Us</h2>
                    <div className="flex flex-wrap mt-10 gap-10 justify-center ">
                        {whyChooseUs.map((step, index) => (
                            <div key={index} className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center g">{step.id}</span>
                                    <h3 className="text-xl font-semibold ">{step.title}</h3>

                                </div>
                                <p className="text-sm md:text-base">{step.paragraph}</p>

                            </div>
                        ))}
                    </div>
                </section>

            </div>
            <Footer />
        </section>
    )
}

export default LegalVideography