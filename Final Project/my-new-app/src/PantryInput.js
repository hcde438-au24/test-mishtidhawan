import React, { useState } from "react";

function PantryInput({ onSearch }) {
  const [input, setInput] = useState("");
  const [dietFilter, setDietFilter] = useState("")

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFilterChange = (e) => {
   setDietFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input, dietFilter);
      setInput("");
    }
  };

  return (
    <div className="pantry-input">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
        <input
        type="text"
        placeholder="Enter ingredients (comma separated)"
        value={input}
        onChange={handleInputChange}
        className="ingredient-input"
        />
        </div>
        <div className="filter-container">
        <select value={dietFilter} onChange={handleFilterChange} className="diet-filter">
          <option value="">No Filter</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
        </div>
        <div className="button-container">
        <button type="submit" className="search-button">Search</button>
        </div>
      </form>
    </div>
  );
}

export default PantryInput;