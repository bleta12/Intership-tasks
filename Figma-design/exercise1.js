
function loadToastStyles() {
  if (!document.getElementById('toast-css')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'exercise1.css'; 
    link.id = 'toast-css';
    document.head.appendChild(link);
  }
}

export function showToast(message, type = 'success') {
  loadToastStyles();

  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
