export function createSearchBar(onSearch) {
  const wrapper = document.createElement('div');
  wrapper.className = 'search-bar-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '🔍 Search characters...';
  input.className = 'search-input';

  input.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    onSearch(value);
  });

  wrapper.appendChild(input);
  return wrapper;
}
