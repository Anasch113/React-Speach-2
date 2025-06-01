import React from 'react'
import LiveTranscriptionGuide from "../../../assets/CAPTIFY.LIVE AI Captions - In-Person Meeting Guide.pdf"
import SignupGuide from "../../../assets/CAPTIFY.LIVE AI Captions - In-Person Meeting Guide.pdf"
import { Download } from 'lucide-react';
const FeatureGuide = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Download Our Guides</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Guide 1 */}
        <div className="border p-6 rounded-2xl shadow-md bg-bg-purple-2 flex flex-col items-center justify-between">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Live AI Captions – In-Person Meeting Guide
          </h3>
          <a
            href={LiveTranscriptionGuide}
            download="CAPTIFY.LIVE-AI-Captions-InPerson-Guide.pdf"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-bg-navy-blue text-white font-medium rounded-lg hover:bg-bg-navy-blue/90 transition"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>

        {/* You can add more guides here if needed */}
        {/* Example placeholder for a second guide */}
        <div className="border p-6 rounded-2xl shadow-md bg-bg-purple-2 flex flex-col items-center justify-between">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Signup Instructions Guide
          </h3>
          <a
            href={SignupGuide}
            download="CAPTIFY.LIVE-Signup-Guide.pdf"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-bg-navy-blue text-white font-medium rounded-lg hover:bg-bg-navy-blue/90 transition"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

export default FeatureGuide
