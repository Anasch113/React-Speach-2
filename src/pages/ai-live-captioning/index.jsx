import { FaKeyboard, FaCog, FaComments, FaSync, FaClipboardList } from 'react-icons/fa';
import Footer from "@/components/layout/footer/Footer";
import aiCaptioningImage from "../../assets/aiCaptioning.jpeg"; // Add your images here
import spellingOptionsImage from "../../assets/spellingOptions.jpeg";
import flexibleEventsImage from "../../assets/poweredmeetingssum.jpeg";

const AILiveCaptioning = () => {
    const whyChooseUs = [
        {
            id: 1,
            icon: <FaKeyboard />,
            title: 'Cost-Effective Solution',
            paragraph: 'Our AI-generated live captioning service offers an affordable alternative to CART, making real-time text capture accessible for events of all sizes.',
        },
        {
            id: 2,
            icon: <FaClipboardList />,
            title: 'Spelling Flexibility',
            paragraph: 'Clients can choose between U.S. or Australian spelling, ensuring the captions are tailored to your audience and location.',
        },
        {
            id: 3,
            icon: <FaCog />,
            title: 'Self-Management Tools',
            paragraph: 'Organizers have full control over the captioning process, from setup to display, making it easy to manage live captions for any event or meeting.',
        },
        {
            id: 4,
            icon: <FaComments />,
            title: 'Flexible for Any Event',
            paragraph: 'From conferences to group discussions, our AI-generated live captioning provides a versatile, easy-to-implement solution for real-time accessibility.',
        },
        {
            id: 5,
            icon: <FaSync />,
            title: 'Fast and Reliable',
            paragraph: 'Using AI-powered technology, our service delivers accurate, real-time captions that keep your audience engaged without breaking your budget.',
        },
    ];

    return (
        <section>
            <div className="max-w-screen-xl mx-auto md:p-0 p-3 mt-10">
                {/* Header Section */}
                <section className="flex items-center justify-between w-full md:flex-row flex-col">
                    <div className="my-5 md:my-24 md:pr-20 text-white md:w-1/2">
                        <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
                            AI Live Captioning
                        </div>
                        <p className="lg:text-lg font-normal my-8 text-center md:text-left">
                            Our AI-generated live captioning service offers real-time text capture for speakers during meetings, conferences, or events. Choose between U.S. or Australian spelling to suit your audience.
                        </p>
                    </div>
                    <img src={aiCaptioningImage} alt="AI Live Captioning" className="mx-auto md:w-1/2 rounded-2xl max-h-[470px] object-cover" />
                </section>

                {/* Self-Managed Captioning Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Self-Managed Captioning and Display</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        Clients have full control over how they provide and display live captions during their events. Our easy-to-use platform allows you to manage everything, from accessing live captions to sharing them with your audience.
                    </p>
                    <img src={spellingOptionsImage} alt="Self-Managed Captioning" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
                </section>

                {/* Ideal for Conferences and Events Section */}
                <section className="md:px-4 mt-20 py-12 text-white flex justify-center items-center flex-col text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Ideal for Conferences, Group Discussions, and More</h2>
                    <p className="mt-4 text-sm md:text-base max-w-[800px]">
                        Our AI-powered captioning service is versatile enough to meet the needs of various events, from large conferences to small group discussions. Captions are displayed in real-time, with U.S. or Australian spelling options for accuracy.
                    </p>
                    <img src={flexibleEventsImage} alt="Flexible for Events" className="mt-6 rounded-2xl md:w-1/2 max-h-[480px] object-cover" />
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

export default AILiveCaptioning;
