import loadingSpinner from './loadingSpinner.js';
import { showToast } from './exercise1.js';

const signUpBtn = document.getElementById('signUpBtn');
const emailInput = document.getElementById('emailInput');


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

signUpBtn.addEventListener('click', () => {
  const email = emailInput.value;

  
  loadingSpinner.showInButton(signUpBtn);

  
  setTimeout(() => {
    
    if (isValidEmail(email)) {
      showToast('✅ Registration successful!', 'success');
      emailInput.value="";
    } else {
      showToast('❌ Invalid email address.', 'error');
    }

   
    loadingSpinner.hideFromButton();
  }, 1000); 
});

 const section = document.querySelector('.features');
  const button = document.getElementById('sortBtn');
  let asc = true;

  button.addEventListener('click', () => {
    const divs = Array.from(section.querySelectorAll('div'));

    divs.sort((a, b) => {
      const textA = a.querySelector('h3').textContent.toLowerCase();
      const textB = b.querySelector('h3').textContent.toLowerCase();

      if (textA < textB) return asc ? -1 : 1;
      if (textA > textB) return asc ? 1 : -1;
      return 0;
    });

    divs.forEach(div => section.removeChild(div));
    divs.forEach(div => section.appendChild(div));

    // Toggle asc flag and update arrow rotation class
    asc = !asc;
    if (asc) {
      button.classList.remove('desc');
    } else {
      button.classList.add('desc');
    }
  });
