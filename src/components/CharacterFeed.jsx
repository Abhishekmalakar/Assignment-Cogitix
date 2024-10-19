// src/components/CharacterGrid.jsx
import React from "react";

const CharacterFeed = ({ characters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character) => (
        <div
          key={character.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold text-black mb-2">
            {character.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default CharacterFeed;
