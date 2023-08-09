
document.getElementById('registerForm').addEventListener('submit', registerUser)
function displayMessage(message, isError = false) {
  const messageContainer = document.getElementById('messageContainerReg');
  messageContainer.innerHTML = `<p class="${isError ? 'error-message' : 'success-message'}">${message}</p>`;
}

function registerUser(e) {
  e.preventDefault();

  const username = document.getElementById('inputUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;


  const userData = {
    username,
    email,
    password
  };

  fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Successful registration') {
        localStorage.setItem('userId', data.userId);
        displayMessage('Successful registration');
      } else {
        displayMessage('Error while registering: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error while registering:', error);
      displayMessage('An error occurred while registering');
    });
}