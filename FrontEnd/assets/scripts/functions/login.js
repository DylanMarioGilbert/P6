export function updatePageForLoggedInUser() {
  console.log('Updating page for logged-in user...');
  const loginLink = document.getElementById('login-link');
  const logoutLink = document.getElementById('logout-link');
  if (loginLink && logoutLink) {
      loginLink.style.display = 'none';
      logoutLink.style.display = 'block';
  }

  const editModeIcon = document.getElementById('edit-mode-icon');
  if (editModeIcon) {
      editModeIcon.style.display = 'block';
  }

  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    siteHeader.style.display = 'block';
  }
}

export function updatePageForLoggedOutUser() {
  console.log('Updating page for logged-out user...');
  const loginLink = document.getElementById('login-link');
  const logoutLink = document.getElementById('logout-link');
  if (loginLink && logoutLink) {
      loginLink.style.display = 'block';
      logoutLink.style.display = 'none';
  }

  const editModeIcon = document.getElementById('edit-mode-icon');
  if (editModeIcon) {
      editModeIcon.style.display = 'none';
  }


  const categoryFilters = document.getElementById('category-filters');
  if (categoryFilters) {
      categoryFilters.style.display = 'flex';
      categoryFilters.style.justifyContent = 'center';
  }

  const buttons = document.querySelectorAll('#category-filters button');
  buttons.forEach(button => {
      button.style.display = 'block';
  });

  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
      siteHeader.style.display = 'none'; 
  }
}

export function handleLogout() {
  localStorage.removeItem('token');

  updatePageForLoggedOutUser();

}

async function handleResponse(response) {
  if (!response.ok) {
      throw new Error('Identifiants invalides');
  }
  return await response.json();
}

export async function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const apiUrl = 'http://localhost:5678/api/users/login';

  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await handleResponse(response);

      if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = 'index.html';
      } else {
          console.error('Identifiants invalides');
      }
  } catch (error) {
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Erreur lors de la requête : ' + error.message;
  }

  updatePageForLoggedInUser();
}


function checkUserLoggedIn() {
  const token = localStorage.getItem('token');
  return token !== null;
}

export function setupLoginForm() {
  const loginForm = document.querySelector('form');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      handleLogin();
  });

  const logoutLink = document.getElementById('logout-link');

  logoutLink.addEventListener('click', function() {
      localStorage.removeItem('token');

      updatePageForLoggedOutUser();
  });
}

export const isLoggedIn = checkUserLoggedIn();