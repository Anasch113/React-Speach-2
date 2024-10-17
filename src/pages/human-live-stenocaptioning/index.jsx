import { FaUserAlt,  FaFileAlt, FaHeadphonesAlt } from 'react-icons/fa';
import Footer from "@/components/layout/footer/Footer";
import onsiteCARTImage from "../../assets/onsiteCART.jpeg"; // Add your images here
import onCARTImage from "../../assets/predictive-intro.jpeg"; // Add your images here
import remoteCARTImage from "../../assets/remoteCART.jpeg";
import transcriptDeliveryImage from "../../assets/transcriptDelivery.jpeg";

const CARTPage = () => {
    const whyChooseUs = [
        {
            id: 1,
            icon: <FaUserAlt />,
            title: 'Certified CART Providers',
            paragraph: 'Our CART providers are highly trained court reporters experienced in real-time translation, offering both accuracy and professionalism.',
        },
        {
            id: 2,
            icon: <FaHeadphonesAlt />,
            title: 'In-Person and Remote Options',
            paragraph: 'Whether you need onsite CART for events or remote CART for virtual meetings, we provide flexible solutions tailored to your needs.',
        },
        {
            id: 3,
            icon: <FaFileAlt />,
            title: 'Comprehensive Transcription',
            paragraph: 'We go beyond live translation by offering electronic transcripts of the event, available within hours if requested.',
        },
    ];

    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3 mt-10">
                {/* Header Section */}
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                        <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
                            Human Live Stenocaptioning (CART)
                        </div>
                        <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                            CART (Communication Access Realtime Translation) is designed for the deaf and hard-of-hearing community. Our certified CART providers capture every spoken word and environmental sound in real-time, ensuring full context and understanding for the recipient.
                        </p>
                    </div>
                    <img src={onsiteCARTImage} alt="Onsite CART" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />
                </section>

                {/* Onsite CART Services Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Onsite CART Services</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        In our Onsite CART service, a certified CART reporter is physically present, using a shorthand machine to input spoken words in real-time. The text is displayed on a personal screen (Personal CART) or projected for larger audiences (Group CART).
                    </p>
                    <img src={onCARTImage} alt="Onsite CART" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* Remote CART Services Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Remote CART Services</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        For clients needing CART support from a distance, we offer Remote CART services. Our CART reporters connect via the internet or phone and stream real-time text back to the recipient, ensuring instant, accurate translations.
                    </p>
                    <img src={remoteCARTImage} alt="Remote CART" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* Electronic Transcript Delivery Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Electronic Transcript Delivery</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        After the event, we offer electronic transcripts available within hours. Perfect for students, professionals, or anyone needing written documentation of the proceedings.
                    </p>
                    <img src={transcriptDeliveryImage} alt="Transcript Delivery" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* Why Choose Us Section */}
                <section className="text-white md:px-4 text-center py-12 flex justify-center items-center flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                    <div className="flex flex-wrap mt-10 gap-10 justify-center">
                        {whyChooseUs.map((step) => (
                            <div key={step.id} className="space-y-1 hover:translate-y-4 cursor-pointer duration-300 max-w-[450px] md:max-h-[240px] bg-slate-900 px-4 md:px-10 py-6 rounded-3xl">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="bg-[#A100FF] rounded-full w-10 h-10 flex justify-center items-center">{step.icon}</span>
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
};

export default CARTPage;
