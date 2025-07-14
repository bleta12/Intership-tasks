export function createFilterComponent(onFilterChange) {
  const filterContainer = document.createElement('div');
  filterContainer.id = 'filter-container';
  filterContainer.classList.add('filter-box');

  // Status Label
  const statusLabel = document.createElement('label');
  statusLabel.htmlFor = 'status-filter';
  statusLabel.textContent = 'Filter by Status:';
  statusLabel.classList.add('filter-label');

  // Status Select Dropdown
  const statusSelect = document.createElement('select');
  statusSelect.id = 'status-filter';
  statusSelect.classList.add('filter-select');

  ['All', 'Alive', 'Dead', 'Unknown'].forEach((status) => {
    const option = document.createElement('option');
    option.value = status.toLowerCase() === 'all' ? '' : status.toLowerCase();
    option.textContent = status;
    statusSelect.appendChild(option);
  });

  statusSelect.addEventListener('change', () => {
    onFilterChange(statusSelect.value);
  });

  filterContainer.appendChild(statusLabel);
  filterContainer.appendChild(statusSelect);

  return filterContainer;
}
