import React, { useEffect, useState } from "react";
import FavoritCard from "./FavoritCard";
const Favourites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
    useEffect(() => {
       localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
  const removeFavorite = (placeName) => {
    setFavorites(favorites.filter((fav) => fav.place != placeName));
  };

  return (
    
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
      {favorites.map(({ place, temp, condotionText, icon }) => (
        <FavoritCard
          place={place}
          temp={temp}
          condotionText={condotionText}
          icon={icon}
          removeFavorite={removeFavorite}
        />
      ))}
    </div>
    
  );
};

export default Favourites;
