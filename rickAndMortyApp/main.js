import { fetchCharacters } from './api/api.js';
import { renderCharacterList } from './components/CharacterList.js';
import { createSearchBar } from './components/SearchComponent.js';
import { debounce } from './utils/debounce.js';
import { createFilterComponent } from './components/FilterComponent.js';

let currentPage = 1;
let isLoading = false;
let hasMore = true;
let searchTerm = '';
let statusFilter = '';

const container = document.getElementById('characters');

// Insert the filter component above characters container
const filterComponent = createFilterComponent((status) => {
  statusFilter = status;
  currentPage = 1;
  hasMore = true;
  container.innerHTML = '';
  loadCharacters(currentPage, searchTerm, statusFilter);
});
document.body.insertBefore(filterComponent, container);

async function loadCharacters(page, name = '', status = '') {
  if (isLoading || !hasMore) return;

  isLoading = true;
  try {
    // Adjust your API call if needed to support status filtering,
    // or filter results client-side after fetching.
    const characters = await fetchCharacters(page, name);

    // If your API doesn't support status filter, do client-side filter:
    const filteredCharacters = status
      ? characters.filter((char) => char.status.toLowerCase() === status)
      : characters;

    if (filteredCharacters.length === 0) {
      hasMore = false;
    } else {
      renderCharacterList(container, filteredCharacters, page !== 1);
      currentPage++;
    }
  } catch (err) {
    console.error('Error loading characters:', err);
  } finally {
    isLoading = false;
  }
}

// Existing infinite scroll listener (no changes needed)
window.addEventListener(
  'scroll',
  debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadCharacters(currentPage, searchTerm, statusFilter);
    }
  }, 200)
);

// Existing search bar with debounce - update to include status filter
const searchWrapper = createSearchBar(
  debounce((value) => {
    searchTerm = value;
    currentPage = 1;
    hasMore = true;
    container.innerHTML = '';
    loadCharacters(currentPage, searchTerm, statusFilter);
  }, 300)
);
document.body.insertBefore(searchWrapper, container);

// Initial load on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadCharacters(currentPage);
});
