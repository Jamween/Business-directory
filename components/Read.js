import axios from "axios";
import { useState, useEffect } from "react";
import Businesses from "./Businesses"; // This will handle displaying individual business items.

function Read() {
  const [businesses, setBusinesses] = useState([]); // store fetched data

  const fetchData = () => {
    axios.get('http://localhost:4000/api/businesses')
      .then((response) => {
        setBusinesses(response.data); // Update  with fetched data
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data 
  }, []);

  return (
    <div>
      <h2>Business List</h2>
      <Businesses myBusinesses={businesses} ReloadData={fetchData} />
    </div>
  );
}

export default Read;
