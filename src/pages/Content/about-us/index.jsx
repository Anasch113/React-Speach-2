import Wrapper from '../../../components/layout/wrapper/Wrapper'
import Footer from '../../../components/layout/footer/Footer'

const Aboutus = () => {
    return (
        <div>
            <Wrapper>
                <div className="min-h-screen bg-black flex items-center justify-center p-4 md:px-40 w-full">
                    <div className="bg-black text-white bg-opacity-90 md:p-8 rounded-lg shadow-lg w-full">
                        <h2 className="text-3xl md:text-6xl font-bold mb-8 text-center text-purple-800">About Captify</h2>

                        <p className="md:text-xl font-light text-white mb-6">
                            With Captify, captivate your audience, deliver dynamic presentations, meetings, and events with confidence and clarity.
                        </p>
                        <p className="md:text-xl font-light text-white mb-8">
                            With Captify, captivate your audience, deliver dynamic presentations, meetings, and events with confidence and clarity.
                        </p>

                        {/* New Content */}
                        <div className="space-y-6 md:text-lg text-white">
                            <div>
                                <h3 className="text-2xl font-semibold text-purple-500 mb-2">🏛️ About Us</h3>
                                <p>
                                    Since 2004, we’ve delivered trusted speech-to-text and litigation support services to law firms, corporate legal teams and government agencies across the Asia-Pacific and the USA.
                                </p>
                                <p>
                                    From realtime stenographic court reporting and captioning to transcript summaries and secure AI-powered tools, our human-led expertise ensures clarity, accuracy, accessibility and discretion—wherever and whenever it’s needed.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-purple-500 mb-2">🎯 Our Mission</h3>
                                <p>
                                    To empower legal and professional teams with secure, precise, and timely speech-to-text solutions—so they can focus on what matters most.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-purple-500 mb-2">💡 Why Work With Us</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>20+ years’ experience supporting litigation and hearings across borders</li>
                                    <li>Specialists in legal language—real people, not just algorithms</li>
                                    <li>Realtime and AI-enhanced options for flexibility and speed</li>
                                    <li>Strict confidentiality protocols and secure infrastructure</li>
                                    <li>Fast, responsive service from people who know the stakes</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-purple-500 mb-2">🤝 Our Values</h3>
                                <p>Precision. Integrity. Responsiveness. Innovation. Partnership.</p>
                            </div>

                            <div className="text-center">
                                <h4 className="text-xl font-semibold mb-2">Let’s Work Together</h4>
                                <p>We’re here to support your next assignment.</p>
                            </div>
                        </div>

                        {/* Call-to-action button */}
                        <div className="text-center mt-10">
                            <a href='/contact-us' className="bg-purple-800 text-white py-3 px-8 rounded-full shadow-md hover:bg-purple-900 transition duration-300 ease-in-out">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer />
        </div>
    );
}

export default Aboutus