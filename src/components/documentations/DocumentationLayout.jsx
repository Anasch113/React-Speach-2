import React from 'react';

import DocSidebar from './DocSidebar';



const DocumentationLayout = ({ children }) => (
  <div className="flex">
    <DocSidebar />
    <main className="flex-1 ">
    
      <div className="p-4">{children}</div>
    </main>
  </div>
);

export default DocumentationLayout;