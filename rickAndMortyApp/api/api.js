

export async function fetchCharacters(page = 1, name = '') {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${encodeURIComponent(name)}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) return []; 
    throw new Error('Failed to fetch characters');
  }
  const data = await res.json();
  return data.results;
}
