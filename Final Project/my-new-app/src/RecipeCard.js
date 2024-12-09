import React from "react";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-actions">
        {recipe.sourceUrl ? (
          <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="view-recipe-button"
          >
            View Recipe
          </a>
        ) : (
          <p className="no-link-message">No recipe link available</p>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;