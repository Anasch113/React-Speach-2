import Footer from "../../components/layout/footer/Footer";


const PrivacyStatement = () => {
  return (
    <>
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="max-w-lg p-4 md:p-8 bg-black shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Privacy Statement</h1>
        <p className="mb-4">At Captify, we are committed to protecting your privacy. This Privacy Statement outlines how we collect, use, and disclose personal information when you use our AI services.</p>
        <p className="mb-4">We collect personal information that you provide to us when you use our services, such as your name, email address, and payment information. We use this information to provide and improve our services and to contact you about updates or new features.</p>
        <p className="mb-4">We may also collect information automatically when you use our services, such as your IP address, device information, and usage data. This information helps us analyze trends and improve our services.</p>
        <p className="mb-4">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or as necessary to provide our services.</p>
        <p className="mb-8">By using our services, you consent to the collection and use of your personal information as described in this Privacy Statement.</p>
        <p className="text-sm text-gray-600">Last updated: [9/6/2024]</p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyStatement;
