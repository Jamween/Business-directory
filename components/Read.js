import axios from "axios"; 
import { useState, useEffect } from "react"; 
import Businesses from "./Businesses"; 

// Component to display and search the list of businesses
function Read() {
  const [businesses, setBusinesses] = useState([]); // for storing fetched businesses
  const [searchQuery, setSearchQuery] = useState(''); //  the search query
  const [searchCategory, setSearchCategory] = useState(''); // for the category filter

  // Fetch all businesses from the server
  const fetchData = () => {
    axios.get('http://localhost:4000/api/businesses')
      .then((response) => {
        setBusinesses(response.data); // Store the response data
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error); // Log errors
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component loads
  }, []);

  // Filter businesses based on the search / category
  const filteredBusinesses = businesses.filter((business) => {
    const matchesName = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = searchCategory
      ? business.category.toLowerCase() === searchCategory.toLowerCase()
      : true; // Match all categories if none selected
    return matchesName && matchesCategory;
  });

  return (
    <div>
      <h2>Business List</h2>
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
          <option value="">All Categories</option> {/* Default option */}
          {/*  generate  category options */}
          {Array.from(new Set(businesses.map(b => b.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Render the filtered businesses */}
      <Businesses myBusinesses={filteredBusinesses} ReloadData={fetchData} />
    </div>
  );
}

export default Read; // Export the component
