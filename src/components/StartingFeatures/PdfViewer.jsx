// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// const PdfViewer = () => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <Document
//         file="your-pdf-file.pdf" // replace with your PDF file path or URL
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <div className="mt-4">
//         <p>
//           Page {pageNumber} of {numPages}
//         </p>
//         <button
//           onClick={() => window.open('your-pdf-file.pdf', '_blank')} // replace with your PDF file path or URL
//           className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none"
//         >
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;
