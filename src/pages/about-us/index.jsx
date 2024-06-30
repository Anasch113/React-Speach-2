import Wrapper from '../../components/layout/wrapper/Wrapper'
import Footer from '../../components/layout/footer/Footer'

const Aboutus = () => {
    return (
        <div>
            <Wrapper>
                <div className="min-h-screen bg-black flex items-center justify-center p-4 md:px-40 w-full">
                    <div className="bg-black text-white bg-opacity-90 md:p-8 rounded-lg shadow-lg w-full">
                        <h2 className="text-3xl md:text-6xl font-bold mb-8 text-center text-purple-800">About Captify</h2>
                        <p className=" md:text-xl font-light text-white mb-6">Captify revolutionizes live captions, delivering precise AI-powered captions in real-time, transcending language barriers, and enhancing accessibility worldwide.</p>
                        <p className=" md:text-xl font-light text-white mb-6">Our cutting-edge technology ensures accurate transcription, enabling seamless communication and engagement for your audience.</p>
                        <p className=" md:text-xl font-light text-white mb-8">With Captify, captivate your audience, deliver dynamic presentations, meetings, and events with confidence and clarity.</p>
                        <div className="text-center">
                            <button className="bg-purple-800 text-white py-3 px-8 rounded-full text0kg  shadow-md hover:bg-purple-900 transition duration-300 ease-in-out">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

            </Wrapper>
            <Footer />
        </div>
    )
}

export default Aboutus