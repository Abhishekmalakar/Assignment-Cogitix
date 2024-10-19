import React, { useState, useEffect } from "react";
import EpisodeList from "./EpisodeList";
import CharacterGrid from "./CharacterFeed";
import Pagination from "./Pagination";
import { fetchEpisodes, fetchCharactersByEpisode } from "../apiServices/api";

const Home = () => {
  const [open, setOpen] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadEpisodes = async () => {
      const episodesData = await fetchEpisodes();
      setEpisodes(episodesData);
      setFilteredEpisodes(episodesData); // Initialize filtered episodes
    };

    loadEpisodes();
  }, []);

  useEffect(() => {
    const loadCharacters = async () => {
      if (selectedEpisode) {
        const charactersData = await fetchCharactersByEpisode(selectedEpisode);
        setCharacters(charactersData);
        setCurrentPage(1);
      } else {
        setCharacters([]);
      }
    };

    loadCharacters();
  }, [selectedEpisode]);

  useEffect(() => {
    const filtered = episodes.filter((episode) =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEpisodes(filtered);
  }, [searchTerm, episodes]);

  const totalPages = Math.ceil(characters.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedCharacters = characters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEpisodeSelect = (episodeId) => {
    if (selectedEpisode === episodeId) {
      setSelectedEpisode(null);
      setCharacters([]);
      setCurrentPage(1);
    } else {
      setSelectedEpisode(episodeId);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`w-1/4 bg-white shadow-xl transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col py-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-semibold text-black">Episodes</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 my-2">
            <input
              type="text"
              placeholder="Search episodes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <EpisodeList
            episodes={filteredEpisodes} // Pass filtered episodes
            selectedEpisode={selectedEpisode}
            onSelectEpisode={handleEpisodeSelect}
          />
        </div>
      </div>
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-4">Characters</h2>
        {characters.length > 0 ? (
          <>
            <CharacterGrid characters={displayedCharacters} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <p className="text-center text-gray-500">
            No characters selected. Please select an episode to view characters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
