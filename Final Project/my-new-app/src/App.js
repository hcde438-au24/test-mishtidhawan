import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import PantryInput from "./PantryInput";
import RecipeList from "./RecipeList";
import { SPOONACULAR_API_KEY } from "./apiKeys";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "searchHistory"));
        const history = querySnapshot.docs.map((doc) => doc.data());
        setSearchHistory(history);
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };

    fetchSearchHistory();
  }, []);

  const fetchRecipes = async (ingredients, dietFilter) => {
    setHasSearched(true);
    setError(false);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&diet=${dietFilter || ""}&number=5&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
      );

      const data = await response.json();
      const fetchedRecipes = data.results || [];
      if (fetchedRecipes.length === 0) {
        setError(true);
      }
      setRecipes(fetchedRecipes);

      const newSearch = {
        ingredients,
        dietFilter: dietFilter || null,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "searchHistory"), newSearch);
      setSearchHistory((prevHistory) => [newSearch, ...prevHistory]);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError(true);
      setRecipes([]);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Recipe Finder: Discover recipes based on ingredients in your pantry!</h1>
      </header>
      <main className="main-content">
        <PantryInput onSearch={fetchRecipes} />
        <div className="search-history">
          <h2>Search History</h2>
          {searchHistory.length > 0 ? (
            <ul>
              {searchHistory.map((search, index) => (
                <li key={index}>
                  {search.ingredients}
                  {search.dietFilter && ` (${search.dietFilter})`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No searches yet.</p>
          )}
        </div>
        <div className="recipe-container">
          {hasSearched && recipes.length === 0 && !error && (
            <p className="no-results">No recipes found. Try adding more ingredients.</p>
          )}
          <RecipeList recipes={recipes} />
          {error && <p className="error-message">Error fetching recipes. Please try again.</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
