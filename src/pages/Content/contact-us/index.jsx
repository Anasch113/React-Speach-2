import { useState } from "react";
import Footer from "../../../components/layout/footer/Footer";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
const ContactForm = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [messageResponse, setMessageResponse] = useState("")
  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_KEY,
      import.meta.env.VITE_EMAILJS_TEMPLATE_KEY,
      {
        from_name: formData.name,
        to_name: "Captify",
        from_email: formData.email,
        to_email: "anaschaudry2002@gmail.com",

        message: `
        name: ${formData.name}
          email: ${formData.email}
          message: ${formData.message}
          `

      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    setMessageResponse("Thank you for contacting us. Our team will contact you shortly within 24 business hours")




  };

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">


        <div className="hidden  lg:block bg-black w-2/4 text-white md:p-8 rounded-lg shadow-lg ml-4 -mt-20">

          <p className="my-5 text-gray-300">We are committed to providing timely and efficient support to ensure that all users have the best experience with Captify. Below, you'll find the details on how to reach our support team, expected response times, and additional resources to assist you. </p>

          <span className="my-5 flex flex-col gap-2 ">
            <p className="text-lg font-semibold">Support Team Hours of Operation:</p>
            <span className="flex flex-col  gap-2 text-gray-300">
              <p> Monday to Friday: 9:00 AM – 6:00 PM (EST)</p>
              <p>Saturday and Sunday: Closed</p>
              <p>National Holidays: Closed</p>

            </span>
            <span className="flex flex-col  gap-2 my-3 text-gray-300" >
              <p className="text-lg font-semibold text-white" > First Response SLA:</p>
              We aim to respond to all support requests within 24 hours during our business hours.
            </span>


          </span>
          <h3 className="text-3xl font-bold mb-4">Contact Information</h3>
          <span className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Email Support:</p>
            <a href="mailto:scheduling@captify.live" target="_main" className="mb-4 text-gray-300">
            scheduling@captify.live
            </a>
          </span>
        

          <span className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Address:</p>
            <p>
            Suite 21, 120 Bloomfield Street, Brisbane, Queensland, Australia 4163
          </p>
          </span>

          
         

        </div>


        <div className="bg-[#242323] text-white p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 md:ml-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-[#A100FF] py-3 w-full" type="submit">
                Send
              </button>
            </div>
          </form>
          <p className="font-poppins my-5  text-lg ">{messageResponse}</p>
        </div>


      </div>
      <div className="mb-10 max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-2">Jason Bradley – Founding Director</h3>
              <p>
                Since its founding in 2004, Captify.live – by Bradley Reporting has brought 
                high-quality speech-to-text, human live captioning, and text capture services 
                to Australian and U.S. clients in the legal, corporate, and government sectors. 
                Jason Bradley is also responsible for positioning Captify.live as a leading 
                global provider of AI-based products and services.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Helen Lubke – Team Leader, Human Speech to Text Services</h3>
              <p>
                With an extensive background in the provision of human stenocaptioning and 
                court reporting services, Helen manages a team of professionals across the 
                U.S. and Australia, delivering thousands of hours annually for government, 
                private sector, and legal clientele.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Samuel Bradley – Team Leader, Legal Videography Services Manager</h3>
              <p>
                Since 2017, Samuel Bradley has led our team of highly mobile legal video specialists, 
                delivering assignments across the Asia Pacific for legal clients in the U.S. and Australia.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Sharny Leung – Team Leader, Captioned Video Services</h3>
              <p>
                Sharny Leung oversees our captioned video team, responsible for producing thousands 
                of hours of captioned video for corporate and government clients annually. 
                She ensures timely and accurate delivery of caption files and transcripts.
              </p>
            </div>
          </div>
        </div>
      <Footer />

    </>
  );
};

export default ContactForm;
