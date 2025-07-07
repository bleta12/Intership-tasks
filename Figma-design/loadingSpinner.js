export default (function () {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);


  const spinner = document.createElement('span');
  spinner.style.width = '16px';
  spinner.style.height = '16px';
  spinner.style.border = '2px solid rgba(255, 255, 255, 0.3)';
  spinner.style.borderTop = '2px solid white';
  spinner.style.borderRadius = '50%';
  spinner.style.animation = 'spin 0.6s linear infinite';
  spinner.style.display = 'inline-block';
  spinner.style.verticalAlign = 'middle';
  spinner.style.marginLeft = '8px';

  let targetButton = null;

  return {
    showInButton(button) {
      if (targetButton) return; 
      targetButton = button;
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = 'Loading';
      button.appendChild(spinner);
    },

    hideFromButton() {
      if (!targetButton) return;
      targetButton.innerHTML = targetButton.dataset.originalText;
      targetButton.disabled = false;
      targetButton = null;
    }
  };
})();
