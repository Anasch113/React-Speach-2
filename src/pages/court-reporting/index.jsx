import stenographicImage from "../../assets/stenographic-expertise.jpeg";
import stenographicIntroImage from "../../assets/stenographic-intro.jpeg";
import { FaCertificate, FaClock, FaLaptop, FaTruck } from 'react-icons/fa';
import Footer from "@/components/layout/footer/Footer";
import { useNavigate } from "react-router-dom";
const StenographicCourtReporting = () => {



     const navigate = useNavigate()


    const whyChooseUs = [
        {
            id: 1,
            icon: <FaCertificate />,
            title: 'Certified Stenographers',
            paragraph: 'Our court certified reporters are highly trained stenographers, ensuring fast and accurate transcripts that meet global professional evidence standards.',
        },
        {
            id: 2,
            icon: <FaClock />,
            title: 'Real-Time Transcription',
            paragraph: 'Our highly accurate real-time transcription services allow you immediate access to your transcripts for faster, more efficient legal proceedings.',
        },
        {
            id: 3,
            icon: <FaLaptop />,
            title: 'Accessible Evidence',
            paragraph: 'We offer stenographic real-time court reporting technology and AI transcript summarisation. Our secure live transcription also assists foreign language interpreters with the task of interpreting evidence for non-English speaking witnesses. Our court CART, Computer Assisted Real-Time,  is also used widely in courts taking evidence from hard-of-hearing or Deaf witnesses.',
        },
        {
            id: 4,
            icon: <FaTruck />,
            title: 'Worldwide Coverage',
            paragraph: 'Whether you’re conducting legal proceedings in Australia, the Asia Pacific or elsewhere internationally, we provide reliable court reporting services wherever you need them.',
        }
    ];

    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3">
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                        <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
                        Stenographic Court Reporting for Australian hearings and U.S. Depositions

                        </div>
                        <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                        We provide court reporting services both for Australian lawyers and U.S. lawyers conducting depositions internationally. Our Australian and U.S. real-time court reporters are experienced in international arbitrations, U.S. depositions and other cross-border cases, ensuring that every spoken word is captured accurately and delivered in a format that complies with the rules of evidence for your jurisdiction.

                        </p>
                        <a href="/contact-us" className="mt-6 px-6 mx-auto md:mx-0 w-full md:w-auto py-3 bg-[#A100FF] text-white">Contact</a>
                    </div>
                    <img src={stenographicImage} alt="Stenographic Reporting" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-top object-cover" />
                </section>

                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Expertise You Can Trust</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                    Stenographic court reporters remain the gold standard for transcribing hearings, arbitrations, depositions and other legal proceedings for Australian and U.S. lawyers. We utilise the latest in stenographic real-time technology to produce transcripts that are precise and fully compatible with your evidence management software.

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
