document.getElementById('loginForm').addEventListener('submit', loginUser);

function displayMessage(message, isError = false) {
  const messageContainer = document.getElementById('messageContainerLog');
  messageContainer.innerHTML = `<p class="${isError ? 'error-message' : 'success-message'}">${message}</p>`;
}

function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const loginData = {
    email,
    password
  };

  fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Successful connection') {
        localStorage.setItem('userId', data.userId);
        displayMessage('Successful connection');
        window.location.href = 'index.html';
      } else {
        displayMessage(`Error while connecting: ${data.message}`, true);
      }
    })
    .catch(error => {
      console.error('Error while connecting :', error);
      displayMessage('An error occurred while logging in', true);
    });
}