// RightSidebar.jsx

import React from "react";
import { useSelector } from "react-redux";


function RightSidebar() {
  const user = {
    username: "John Doe",
    email: "john@example.com",
    profilePicture: "https://placekitten.com/200/200", // replace with your image source
  };

  const summary = useSelector((state) => state.audio.summaryData);
  console.log("summary: in right bar", summary);


  return (
    <aside
      className="w-96 px-2 bg-white h-full overflow-x-hidden overflow-y-scroll hidden md:block lg:block xl:block 2xl:block"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}
    >
      {/* Add your sidebar content here */}
      <div className="m-2 pt-4 flex">
        <p className="text-xl font-semibold">Summary</p>
      </div>
      <div className="m-2 p-4 flex bg-white  border border-border-dark-color rounded-md">
      <div>
  {
    summary && summary.length > 0 ? (
      summary.map((sum, i) => (
        <div key={i}>
          <p>{sum.summary}</p>
        </div>
      ))
    ) : (
      <p>There is no summary</p>
    )
  }
</div>
      </div>

    </aside>
  );
}

export default RightSidebar;
