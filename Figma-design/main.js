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
