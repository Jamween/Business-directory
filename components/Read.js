import axios from "axios";
import { useState, useEffect } from "react";
import Businesses from "./Businesses";

function Read() {
  const [businesses, setBusinesses] = useState([]); // Store fetched data
  const [searchQuery, setSearchQuery] = useState(''); // Store the search query

  const fetchData = () => {
    axios.get('http://localhost:4000/api/businesses')
      .then((response) => {
        setBusinesses(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  // Filter businesses based on the search query
  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Business List</h2>

      
      <div className="search-bar">
  <input
    type="text"
    className="form-control"
    placeholder="Search for a business..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>
      <Businesses myBusinesses={filteredBusinesses} ReloadData={fetchData} />
    </div>
  );
}

export default Read;
