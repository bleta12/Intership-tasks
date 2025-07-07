import loadingSpinner from './loadingSpinner.js';

const button = document.getElementById('loadBtn');

button.addEventListener('click', () => {
  loadingSpinner.show();

  
  setTimeout(() => {
    loadingSpinner.hide();
  }, 3000);
});
