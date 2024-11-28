import { useEffect } from "react";
import api from "../../api";

function HeartBeat() {
  // Function to ping the server and keep the activity alive
  const sendHeartbeat = async () => {
    try {
      await api.post("/customers/useractivity");
    } catch (error) {
      console.error("Error sending heartbeat:", error);
    }
  };

  // Set an interval to send heartbeat every minute
  useEffect(() => {
    const interval = setInterval(() => {
      sendHeartbeat();
    }, 70000); // every minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}

export default HeartBeat;
