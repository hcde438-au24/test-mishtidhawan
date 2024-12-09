import React from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, hasSearched, error}) {
  if (error) {
    return <p>Error: No recipes found. Please check your input and try again. </p>
  }
  if (hasSearched && recipes.length === 0) {
    return <p>No recipes found. Try adding ingredients to search. </p>;
  }

  return (
    <div className = "recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;