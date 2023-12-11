import React, { useState } from "react";
import axios from "axios";

const BotApi = () => {
  const [meetingUrl, setMeetingUrl] = useState("");

  const handleAddBotClick = () => {
    const parameters = {
      meetingUrl: meetingUrl,
      language: "en-US",
      apiKey:
        "1af56edd7650b135862a411d2f05661f1e5bc979449dfead7a2bb4d7ec19dee08ab4d1a9272571d379705c6edd11013dc249fbe96cf2e8cfb9f2a2f5ae5ed818",
    };

    axios
      .get("https://api.transkriptor.com/7/Add-Bot-to-Meeting", {
        params: parameters,
      })
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a success message to the user
      })
      .catch((error) => {
        console.log(error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full height of the viewport
      }}
    >
      <label style={{ marginBottom: "1em", fontSize: "1.2em" }}>
        Meeting URL:
        <input
          type="text"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
          style={{
            marginLeft: "0.5em",
            padding: "0.5em",
            fontSize: "1em",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          placeholder="Enter meeting URL"
        />
      </label>
      <button
        onClick={handleAddBotClick}
        style={{
          padding: "0.5em 1em",
          fontSize: "1em",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Add Bot to Meeting
      </button>
    </div>
  );
};

export default BotApi;
