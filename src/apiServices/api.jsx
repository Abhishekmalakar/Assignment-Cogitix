export const fetchEpisodes = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await response.json();
  return data.results;
};

export const fetchCharactersByEpisode = async (episodeId) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeId}`
  );
  const data = await response.json();
  const characterPromises = data.characters.map((url) =>
    fetch(url).then((res) => res.json())
  );
  return Promise.all(characterPromises);
};
