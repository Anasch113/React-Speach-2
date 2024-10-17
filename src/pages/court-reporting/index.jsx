import stenographicImage from "../../assets/stenographic-expertise.jpeg";
import stenographicIntroImage from "../../assets/stenographic-intro.jpeg";
import { FaCertificate, FaClock, FaLaptop, FaTruck } from 'react-icons/fa';
import Footer from "@/components/layout/footer/Footer";

const StenographicCourtReporting = () => {
    const whyChooseUs = [
        {
            id: 1,
            icon: <FaCertificate />,
            title: 'Certified Stenographers',
            paragraph: 'Our court reporters are highly trained stenographers, ensuring fast and accurate transcripts that meet global professional standards.',
        },
        {
            id: 2,
            icon: <FaClock />,
            title: 'Real-Time Transcription',
            paragraph: 'We provide real-time transcription services, giving you immediate access to your transcripts for faster, more efficient legal proceedings.',
        },
        {
            id: 3,
            icon: <FaLaptop />,
            title: 'Tech-Savvy Reporting',
            paragraph: 'Our reporters use the latest stenographic technology and produce transcripts in formats compatible with most legal software systems, ensuring seamless integration with your processes.',
        },
        {
            id: 4,
            icon: <FaTruck />,
            title: 'Worldwide Coverage',
            paragraph: 'Whether you’re handling legal proceedings in Australia, the Asia Pacific, or internationally, we provide reliable court reporting services wherever you need them.',
        }
    ];

    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                        <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
                            Stenographic Court Reporting for U.S. Depositions
                        </div>
                        <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                            We provide court reporting services specifically tailored for U.S. lawyers conducting depositions internationally. Our stenographic reporters are experienced in handling cross-border cases, ensuring that every spoken word is captured with flawless accuracy and delivered in a format compatible with U.S. legal systems.
                        </p>
                        <button className="mt-6 px-6 mx-auto md:mx-0 w-full md:w-auto py-3 bg-[#A100FF] text-white">Learn More</button>
                    </div>
                    <img src={stenographicImage} alt="Stenographic Reporting" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-top object-cover" />
                </section>

                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Expertise You Can Trust</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        Our professional court reporters are skilled in transcribing hearings, mediations, arbitrations, and other legal proceedings for Australian lawyers. We utilise the latest in stenographic real-time technology to produce real-time transcripts that are precise and fully compatible with modern legal software.
                    </p>
                    <img src={stenographicIntroImage} alt="Stenographic Expertise" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                    <div className="flex flex-wrap mt-10 gap-10 justify-center">
                        {whyChooseUs.map((step, index) => (
                            <div key={index} className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">{step.id}</span>
                                    <h3 className="text-xl font-semibold">{step.title}</h3>
                                </div>
                                <p className="text-sm md:text-base">{step.paragraph}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </section>
    );
}

export default StenographicCourtReporting;
