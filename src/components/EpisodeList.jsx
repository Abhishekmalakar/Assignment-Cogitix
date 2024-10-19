// src/components/EpisodeList.jsx
import React from "react";

const EpisodeList = ({ episodes, selectedEpisode, onSelectEpisode }) => {
  return (
    <ul className="space-y-4 overflow-y-auto">
      {episodes.length > 0 ? (
        episodes.map((episode) => (
          <li
            key={episode.id}
            className={`cursor-pointer p-2 rounded-md transition duration-200 ease-in-out ${
              selectedEpisode === episode.id
                ? "bg-blue-200 border-l-4 border-blue-500"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => onSelectEpisode(episode.id)}
          >
            {episode.name} ({episode.episode})
          </li>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading episodes...</p>
      )}
    </ul>
  );
};

export default EpisodeList;
