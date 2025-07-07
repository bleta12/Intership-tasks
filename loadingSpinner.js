export default (function() {
  const overlay = document.createElement('div');
  overlay.style.display = 'none';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0, 0, 0, 0.3)';
  overlay.style.backdropFilter = 'blur(2px)';
  overlay.style.zIndex = '9998';

  const spinner = document.createElement('div');
  spinner.style.width = '60px';
  spinner.style.height = '60px';
  spinner.style.border = '6px solid rgba(255, 255, 255, 0.3)';
  spinner.style.borderTopColor = '#ffffff';
  spinner.style.borderRadius = '50%';
  spinner.style.animation = 'spin 1s ease-in-out infinite';
  spinner.style.position = 'absolute';
  spinner.style.top = '50%';
  spinner.style.left = '50%';
  spinner.style.transform = 'translate(-50%, -50%)';

  overlay.appendChild(spinner);
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  return {
    show() {
      overlay.style.display = 'block';
    },
    hide() {
      overlay.style.display = 'none';
    },
    toggle() {
      overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
    }
  };
})();
