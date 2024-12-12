import axios from "axios";
import { useState, useEffect } from "react";
import Businesses from "./Businesses";

function Read() {
  const [businesses, setBusinesses] = useState([]); // Store fetched data
  const [searchQuery, setSearchQuery] = useState(''); // Store the text search query
  const [searchCategory, setSearchCategory] = useState(''); // Store the selected category

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

  // Filter businesses based on search query and category
  const filteredBusinesses = businesses.filter((business) => {
    const matchesName = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = searchCategory
      ? business.category.toLowerCase() === searchCategory.toLowerCase()
      : true; // If no category is selected, match all

    return matchesName && matchesCategory;
  });

  return (
    <div>
      <h2>Business List</h2>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Dropdown */}
      <div className="mb-3">
        <select
          className="form-control"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(businesses.map(b => b.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Render Filtered Businesses */}
      <Businesses myBusinesses={filteredBusinesses} ReloadData={fetchData} />
    </div>
  );
}

export default Read;
