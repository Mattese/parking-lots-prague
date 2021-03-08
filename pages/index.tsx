import axios from "axios";
import { useEffect, useState } from "react";

// TODO: Hide API_KEY
const downloadData = async () => {
  try {
    const { data } = await axios.get("https://api.golemio.cz/v2/parkings/", {
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlaWNobG1Ac2V6bmFtLmN6IiwiaWQiOjY4MywibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwiaWF0IjoxNjE0OTU5MTUxLCJleHAiOjExNjE0OTU5MTUxLCJpc3MiOiJnb2xlbWlvIiwianRpIjoiMmJlYTFjMzMtYjllMi00MzU3LTg0Y2MtMjNmMTUwYjQ0NDdkIn0.bePD7p4wf3K--ohk38oadTIFE7EmmNNiZfRjeH2tcuA",
      },
    });
    return data;
  } catch (error) {}
};

const Index = () => {
  const [parkings, setParkings] = useState([]);

  console.log(parkings);

  useEffect(() => {
    downloadData().then((parkings) => {
      setParkings(parkings);
    });
  }, []);

  return <>body</>;
};
export default Index;
